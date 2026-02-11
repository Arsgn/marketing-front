import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}/api/v1`,
});

// Token management
export const token = {
  get: () => localStorage.getItem('access_token'),
  set: (value: string) => localStorage.setItem('access_token', value),
  getRefresh: () => localStorage.getItem('refresh_token'),
  setRefresh: (value: string) => localStorage.setItem('refresh_token', value),
  remove: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

// Добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
  const accessToken = token.get();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Обновляем токен при 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = token.getRefresh();
      if (!refreshToken) {
        token.remove();
        window.location.href = '/auth';
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
        window.location.href = '/auth';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);