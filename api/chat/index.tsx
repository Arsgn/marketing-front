import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

const useGetMessages = () => {
  return useQuery<CHAT.GetMessagesRes, Error>({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await api.get<CHAT.GetMessagesRes>("/chat/get-all");
      return response.data;
    },
    refetchInterval: 3000, 
  });
};

const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<CHAT.SendMessageRes, Error, CHAT.SendMessageReq>({
    mutationFn: async (data) => {
      const response = await api.post<CHAT.SendMessageRes>("/chat/send", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

const useGetUsers = () => {
  return useQuery<CHAT.GetUsersRes, Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get<CHAT.GetUsersRes>("/chat/users");
      return response.data;
    },
  });
};

const useGetPrivateMessages = (receiverId: number, enabled: boolean = true) => {
  return useQuery<CHAT.GetPrivateMessagesRes, Error>({
    queryKey: ["private-messages", receiverId],
    queryFn: async () => {
      const response = await api.get<CHAT.GetPrivateMessagesRes>(
        `/chat/private/${receiverId}`
      );
      return response.data;
    },
    enabled,
    refetchInterval: 3000, 
  });
};

const useSendPrivateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CHAT.SendPrivateMessageRes,
    Error,
    CHAT.SendPrivateMessageReq
  >({
    mutationFn: async (data) => {
      const response = await api.post<CHAT.SendPrivateMessageRes>(
        "/chat/private/send",
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["private-messages", variables.receiverId],
      });
      queryClient.invalidateQueries({
        queryKey: ["last-messages"],
      });
    },
  });
};

const useGetLastMessages = () => {
  return useQuery<CHAT.GetLastMessagesRes, Error>({
    queryKey: ["last-messages"],
    queryFn: async () => {
      const response = await api.get<CHAT.GetLastMessagesRes>(
        "/chat/last-messages"
      );
      return response.data;
    },
    refetchInterval: 10000, 
  });
};

export {
  useGetMessages,
  useSendMessage,
  useGetUsers,
  useGetPrivateMessages,
  useSendPrivateMessage,
  useGetLastMessages, 
};