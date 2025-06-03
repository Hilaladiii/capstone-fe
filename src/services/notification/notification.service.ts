import axiosInstance from "../../services/setup.service";
import { NotificationResponse, NotificationDetailResponse } from "../../common/types/notification.type";

export class NotificationService {
  static fetchNotifications() {
    return axiosInstance.get<NotificationResponse>('/notification');
  }

  static fetchNotificationById(id: string) {
    return axiosInstance.get<NotificationDetailResponse>(`/notification/${id}`);
  }

  static markNotificationsAsRead() {
    return axiosInstance.patch('/notification/read');
  }
}