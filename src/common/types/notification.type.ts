export interface Notification {
  title: string;
  content: string;
  notificationId: string;
  status: string;
  readAt: string | null;
}

export interface NotificationResponse {
  data: Notification[];
}

export interface UnreadCountResponse {
  data: number;
}
