declare namespace CHAT {
  interface User {
    id: number;
    name: string | null;
    avatar: string | null;
  }

  interface Message {
    id: number;
    userId: number;
    message: string;
    createdAt: string;
    updatedAt: string;
    user: User;
  }

  interface GetMessagesRes {
    success: boolean;
    data: Message[];
  }

  interface SendMessageReq {
    message: string;
  }

  interface SendMessageRes {
    success: boolean;
    data: Message;
  }

  interface GetUsersRes {
    success: boolean;
    data: {
      id: number;
      name: string | null;
      email: string;
      avatar: string | null;
    }[];
  }

  interface PrivateMessage {
    id: number;
    senderId: number;
    receiverId: number;
    message: string;
    createdAt: string;
    updatedAt: string;
  }

  interface GetPrivateMessagesRes {
    success: boolean;
    data: PrivateMessage[];
  }

  interface SendPrivateMessageReq {
    receiverId: number;
    message: string;
  }

  interface SendPrivateMessageRes {
    success: boolean;
    data: PrivateMessage;
  }

  interface LastMessage {
    userId: number;
    lastMessage: string | null;
    createdAt: string | null;
  }

  interface GetLastMessagesRes {
    success: boolean;
    data: LastMessage[];
  }
}