import { useMutation, useQuery } from "@tanstack/react-query";
import { api, token } from "..";
import { useAuthStore } from "@/store/auth.store";

const useSignIn = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation<AUTH.SignInRes, Error, AUTH.SignInReq>({
    mutationFn: async (data) => {
      const response = await api.post<AUTH.SignInRes>("/user/sign-in", data);

      if (response.data.success) {
        // сохраняем токены
        token.set(response.data.data.session.access_token);
        token.setRefresh(response.data.data.session.refresh_token);

        // сразу обновляем zustand
        setUser(response.data.data.user);
      }

      return response.data;
    },
  });
};

const useSignUp = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation<AUTH.SignUpRes, Error, AUTH.SignUpReq>({
    mutationFn: async (data) => {
      const response = await api.post<AUTH.SignUpRes>("/user/sign-up", data);

      if (response.data.success) {
        token.set(response.data.data.session.access_token);
        token.setRefresh(response.data.data.session.refresh_token);
        setUser(response.data.data.user);
      }

      return response.data;
    },
  });
};

const useSignOut = () => {
  const clearUser = useAuthStore((s) => s.clearUser);

  return useMutation<AUTH.SignOutRes, Error, void>({
    mutationFn: async () => {
      const response = await api.post<AUTH.SignOutRes>("/user/sign-out");
      token.remove();
      clearUser();
      return response.data;
    },
  });
};


const useRefreshToken = () => {
  return useMutation<AUTH.RefreshTokenRes, Error, AUTH.RefreshTokenReq>({
    mutationFn: async (data) => {
      const response = await api.post<AUTH.RefreshTokenRes>(
        "/user/refresh-token",
        data,
      );

      if (response.data.success) {
        token.set(response.data.data.session.access_token);
        token.setRefresh(response.data.data.session.refresh_token);
      }

      return response.data;
    },
  });
};

const useGetUser = (id: number, enabled: boolean = true) => {
  return useQuery<AUTH.GetUserRes, Error>({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await api.get<AUTH.GetUserRes>(`/user/get/${id}`);
      return response.data;
    },
    enabled,
  });
};

const useUpdateUser = () => {
  return useMutation<
    AUTH.UpdateUserRes,
    Error,
    { id: number; data: AUTH.UpdateUserReq }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await api.patch<AUTH.UpdateUserRes>(
        `/user/update/${id}`,
        data,
      );
      return response.data;
    },
  });
};

export {
  useSignUp,
  useSignIn,
  useSignOut,
  useRefreshToken,
  useGetUser,
  useUpdateUser,
};
