import { useEffect, useState } from "react";
import { NotificationService } from "../../services/notification/notification.service";
import { Notification, NotificationDetail } from "../types/notification.type";

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await NotificationService.fetchNotifications();
        const notificationData = response.data.data;
        setNotifications(notificationData);
        
        // Calculate unread count from the notifications data
        const unreadNotifications = notificationData.filter(
          (notification: Notification) => notification.status === "UNREAD"
        );
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markNotificationsAsRead = async () => {
    try {
      await NotificationService.markNotificationsAsRead();
      // Update local state to reflect all notifications as read
      setUnreadCount(0);
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({
          ...notification,
          status: "READ"
        }))
      );
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return { unreadCount, notifications, markNotificationsAsRead };
}

export function useNotificationDetail(id: string) {
  const [notification, setNotification] = useState<NotificationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await NotificationService.fetchNotificationById(id);
        setNotification(response.data.data);
      } catch (error) {
        console.error("Error fetching notification detail:", error);
        setError("Gagal memuat detail notifikasi");
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationDetail();
  }, [id]);

  return { notification, loading, error };
}