import { useNotifications } from "../../common/hooks/useNotification";
import FooterLayout from "../../components/layout/FooterLayout";
import HeaderLayout from "../../components/layout/HeaderLayout";
import { Button } from "../../components/ui/button";

const NotificationList = () => {
  const { unreadCount, notifications, markNotificationsAsRead } = useNotifications();

  return (
    <main className="flex flex-col">
      <HeaderLayout />
      <div className="max-w-full pt-20 bg-primary flex flex-col items-center justify-center">
        <h2 className="text-xl py-4 font-semibold text-secondary">Daftar Notifikasi</h2>
        <div className="h-1 w-80 flex items-center justify-center px-10 bg-gradient-to-l from-secondary from-60% to-primary to-100% mb-10" />

        <div className="rounded-lg shadow-lg w-full max-w-6xl">
          <div className="border-b-2 border-white p-6">
            <div className="flex items-center justify-between">
              <span className="bg-secondary text-white text-sm font-medium px-3 py-2 rounded-lg">
                Unread Notifications: {unreadCount || 0}
              </span>
              <Button
                onClick={markNotificationsAsRead}
                variant="secondary"
                className="text-white text-sm rounded-lg px-3 py-2 font-medium cursor-pointer bg-secondary hover:bg-white hover:text-secondary"
              >
                Mark All as Read
              </Button>
            </div>
          </div>

          <div className="divide-y mt-6">
            {notifications?.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.notificationId}
                  className={`px-6 py-3 hover:bg-gray-50 transition-colors w-full my-4 ${
                    notification.status === "UNREAD"
                      ? "bg-white border-l-4 m-2 rounded-2xl"
                      : "bg-white m-2 rounded-2xl"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2"></div>
                      <p className="text-sm font-semibold text-black">
                        {notification.title}
                      </p>
                    </div>
                    <div className="ml-4">
                      {notification.status === "UNREAD" && (
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-white text-lg">Tidak ada notifikasi</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterLayout />
    </main>
  );
};

export default NotificationList;
