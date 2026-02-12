import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}/api/v1`,
});

export const token = {
  get: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  },
  set: (value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", value);
    }
  },
  getRefresh: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refresh_token");
    }
    return null;
  },
  setRefresh: (value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("refresh_token", value);
    }
  },
  remove: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  },
};

api.interceptors.request.use((config) => {
  const accessToken = token.get();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = token.getRefresh();
      if (!refreshToken) {
        token.remove();
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
        return Promise.reject(error);
      }
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/v1/user/refresh-token`,
          { refreshToken }
        );
        token.set(data.data.session.access_token);
        token.setRefresh(data.data.session.refresh_token);
        originalRequest.headers.Authorization = `Bearer ${data.data.session.access_token}`;
        return api(originalRequest);
      } catch {
        token.remove();
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);