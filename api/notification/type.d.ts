declare namespace NOTIFICATION {
  interface Notification {
    id: number;
    userId: number;
    senderId?: number;
    title: string;
    isRead: boolean;
    createdAt: string;

    sender?: {
      id: number;
      name: string | null;
      avatar: string | null;
    };
  }

  interface GetNotificationsRes {
    success: boolean;
    data: Notification[];
  }

  interface MarkAsReadRes {
    success: boolean;
    message: string;
  }
}
