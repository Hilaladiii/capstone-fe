import { useEffect, useState } from "react";
import { useAuth } from "../../common/hooks/useAuth";
import { NotificationService } from "../../services/notification/notification.service";
import { Notification } from "../types/notification.type";
import { setAuthToken } from "../../services/setup.service";

export function useNotifications() {
  const { token } = useAuth();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useEffect(() => {
    if (!token) return;

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
  }, [token]);

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
