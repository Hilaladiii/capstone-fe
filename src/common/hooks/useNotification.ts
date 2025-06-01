import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../common/hooks/useAuth";
import { NotificationService } from "../../services/notification/notification.service";
import { axiosErrorHandling } from "../../services/setup.service";

export function useNotifications() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: notificationsData,
    isLoading: notificationsLoading,
    error: notificationsError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => NotificationService.fetchNotifications(),
    enabled: !!token,
    select: (response) => response.data.data,
  });

  const {
    data: unreadCountData,
    isLoading: unreadCountLoading,
    error: unreadCountError,
  } = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => NotificationService.fetchUnreadCount(),
    enabled: !!token,
    select: (response) => response.data.data,
  });

  const markAsReadMutation = useMutation({
    mutationFn: () => NotificationService.markNotificationsAsRead(),
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
    onError: (error) => {
      const message = axiosErrorHandling(error, "Failed to mark notifications as read");
      toast.error(message);
    },
  });

  return {
    notifications: notificationsData || [],
    unreadCount: unreadCountData || 0,
    isLoading: notificationsLoading || unreadCountLoading,
    isError: notificationsError || unreadCountError,
    markNotificationsAsRead: markAsReadMutation.mutate,
    isMarkingAsRead: markAsReadMutation.isPending,
  };
}