export interface Notification {
  title: string;
  content: string;
  notificationId: string;
  status: string;
  readAt: string | null;
}

export interface NotificationDetail {
  id: string;
  title: string;
  content: string;
  fileUrl?: string;
}

export interface NotificationResponse {
  statusCode: number;
  message: string;
  data: Notification[];
}

export interface NotificationDetailResponse {
  statusCode: number;
  message: string;
  data: NotificationDetail;
}