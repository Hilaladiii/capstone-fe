import axiosInstance from "../../services/setup.service";
import { NotificationResponse, UnreadCountResponse, MarkAsReadResponse } from "../../common/types/notification.type";

export class NotificationService {
  static fetchNotifications() {
    return axiosInstance.get<NotificationResponse>('/notification');
  }

  static fetchUnreadCount() {
    return axiosInstance.get<UnreadCountResponse>('/notification/unread-count');
  }

  static markNotificationsAsRead() {
    return axiosInstance.patch<MarkAsReadResponse>('/notification/read');
  }
}