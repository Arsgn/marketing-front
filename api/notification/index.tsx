import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "..";


const useGetNotifications = () => {
  return useQuery<NOTIFICATION.GetNotificationsRes, Error>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await api.get<NOTIFICATION.GetNotificationsRes>("/notification");
      return response.data;
    },
    refetchInterval: 5000,
  });
};

const useMarkNotificationsRead = () => {
  const queryClient = useQueryClient();
  return useMutation<NOTIFICATION.MarkAsReadRes, Error>({
    mutationFn: async () => {
      const response = await api.patch<NOTIFICATION.MarkAsReadRes>("/notification/read");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export { useGetNotifications, useMarkNotificationsRead };