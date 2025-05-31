import { useEffect, useState } from "react";
import { NotificationService } from "../../services/notification/notification.service";
import { Notification } from "../types/notification.type";

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await NotificationService.fetchNotifications();
        setNotifications(response.data.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const fetchUnreadCount = async () => {
      try {
        const response = await NotificationService.fetchUnreadCount();
        setUnreadCount(response.data.data);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchNotifications();
    fetchUnreadCount();
  }, []);

  const markNotificationsAsRead = async () => {
    try {
      await NotificationService.markNotificationsAsRead();
      setUnreadCount(0);
      setNotifications([]);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  return { unreadCount, notifications, markNotificationsAsRead };
}
