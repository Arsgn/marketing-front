import { useMutation, useQuery } from "@tanstack/react-query";
import { api, token } from "..";

// ==================== AUTH HOOKS ====================

export const useSignUp = () => {
  return useMutation<AUTH.SignUpRes, Error, AUTH.SignUpReq>({
    mutationFn: async (data) => {
      const response = await api.post<AUTH.SignUpRes>("/user/sign-up", data);
      
      if (response.data.success) {
        token.set(response.data.data.session.access_token);
        token.setRefresh(response.data.data.session.refresh_token);
      }
      
      return response.data;
    },
  });
};

export const useSignIn = () => {
  return useMutation<AUTH.SignInRes, Error, AUTH.SignInReq>({
    mutationFn: async (data) => {
      const response = await api.post<AUTH.SignInRes>("/user/sign-in", data);
      
      if (response.data.success) {
        token.set(response.data.data.session.access_token);
        token.setRefresh(response.data.data.session.refresh_token);
      }
      
      return response.data;
    },
  });
};

export const useSignOut = () => {
  return useMutation<AUTH.SignOutRes, Error, void>({
    mutationFn: async () => {
      const response = await api.post<AUTH.SignOutRes>("/user/sign-out");
      token.remove();
      return response.data;
    },
  });
};

export const useRefreshToken = () => {
  return useMutation<AUTH.RefreshTokenRes, Error, AUTH.RefreshTokenReq>({
    mutationFn: async (data) => {
      const response = await api.post<AUTH.RefreshTokenRes>("/user/refresh-token", data);
      
      if (response.data.success) {
        token.set(response.data.data.session.access_token);
        token.setRefresh(response.data.data.session.refresh_token);
      }
      
      return response.data;
    },
  });
};

export const useGetUser = (id: number, enabled: boolean = true) => {
  return useQuery<AUTH.GetUserRes, Error>({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await api.get<AUTH.GetUserRes>(`/user/get/${id}`);
      return response.data;
    },
    enabled,
  });
};

export const useUpdateUser = () => {
  return useMutation<AUTH.UpdateUserRes, Error, { id: number; data: AUTH.UpdateUserReq }>({
    mutationFn: async ({ id, data }) => {
      const response = await api.patch<AUTH.UpdateUserRes>(`/user/update/${id}`, data);
      return response.data;
    },
  });
};
