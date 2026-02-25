import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "..";


const useGetNotifications = () => {
  return useQuery<NOTIFICATION.GetNotificationsRes>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/notification");
      return res.data;
    },
    refetchInterval: 3000,
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