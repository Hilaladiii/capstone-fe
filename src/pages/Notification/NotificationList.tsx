import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../common/hooks/useNotification";

const NotificationList = () => {
  const navigate = useNavigate();
  const { notifications } =
    useNotifications();

  const handleViewDetail = (notificationId: string) => {
    navigate(`/notification/${notificationId}`);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <main className="flex flex-col">
      <div className="max-w-full pt-20 bg-primary flex flex-col items-center justify-center">
        <h2 className="text-xl py-4 font-semibold text-secondary">
          Daftar Notifikasi
        </h2>
        <div className="h-1 w-80 flex items-center justify-center px-10 bg-gradient-to-l from-secondary from-60% to-primary to-100% mb-10" />

        <div className="rounded-lg shadow-lg w-full max-w-6xl max-h-screen overflow-x-hidden overflow-y-auto">
          <div className="divide-y mt-6 px-6">
            {notifications?.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.notificationId}
                  className={`px-6 py-4 hover:bg-gray-50 transition-colors w-full my-4 cursor-pointer ${
                    notification.status === "UNREAD"
                      ? "bg-white border-l-4 border-l-secondary m-2 rounded-2xl shadow-md"
                      : "bg-white m-2 rounded-2xl shadow-sm"
                  }`}
                  onClick={() => handleViewDetail(notification.notificationId)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="text-base font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        {notification.status === "UNREAD" && (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Baru
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {notification.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {notification.readAt && (
                          <div className="flex items-center gap-1">
                            <span>Dibaca: {formatDate(notification.readAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <p className="text-white text-lg">Tidak ada notifikasi</p>
                <p className="text-gray-300 text-sm mt-2">Notifikasi baru akan muncul di sini</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotificationList;