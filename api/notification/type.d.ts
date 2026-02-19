declare namespace NOTIFICATION {
  interface Notification {
    id: number;
    userId: number;
    title: string;
    isRead: boolean;
    createdAt: string;
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