export interface Notification {
  title: string;
  content: string;
  notificationId: string;
  status: string;
  readAt: string | null;
}

export interface NotificationResponse {
  statusCode: number;
  message: string;
  data: Notification[];
}

export interface UnreadCountResponse {
  statusCode: number;
  message: string;
  data: number;
}

export interface MarkAsReadResponse {
  statusCode: number;
  message: string;
}