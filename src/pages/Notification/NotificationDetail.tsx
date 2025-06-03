import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NotificationService } from "../../services/notification/notification.service";
import { NotificationDetail as NotificationDetailType } from "../../common/types/notification.type";
import { Button } from "../../components/ui/button";
import HeaderLayout from "../../components/layout/HeaderLayout";
import FooterLayout from "../../components/layout/FooterLayout";
import { BiSolidFilePdf } from "react-icons/bi";


const NotificationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<NotificationDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
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

  const handleBack = () => {
    navigate(-1);
  };

  const handleReply = () => {
    console.log("Reply:", replyText);
    setReplyText("");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center bg-primary min-h-screen">
        <HeaderLayout />
        <div className="flex flex-col items-center justify-center px-20 pt-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-white/20 rounded w-64 mb-4"></div>
            <div className="h-2 w-80 bg-white/20 rounded mb-10"></div>
            <div className="w-full max-w-7xl bg-white/20 rounded-2xl h-96"></div>
          </div>
        </div>
        <FooterLayout />
      </div>
    );
  }

  if (error || !notification) {
    return (
      <div className="flex flex-col items-center bg-primary min-h-screen">
        <HeaderLayout />
        <div className="flex flex-col items-center justify-center px-20 pt-20">
          <h1 className="text-3xl text-center font-bold mb-8 mt-6 text-white">
            {error || "Notifikasi tidak ditemukan"}
          </h1>
          <Button 
            onClick={handleBack}
            variant="secondary"
            className="text-sm rounded-full px-10 py-2"
          >
            Kembali
          </Button>
        </div>
        <FooterLayout />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-primary min-h-screen">
      <HeaderLayout />
      <div className="flex flex-col items-center justify-center px-20 pt-20">
        <h1 className="text-xl text-center font-semibold mb-6 mt-6 text-white">Notifikasi</h1>
        <div className="h-1 w-80 flex items-center justify-center px-10 bg-gradient-to-l from-secondary from-60% to-primary to-100% mb-10" />
      </div>

      <div className="text-black bg-white w-full max-w-7xl rounded-2xl flex flex-col items-center justify-center mb-10 shadow-lg">
        {notification.fileUrl && (
          <div className="w-full flex justify-center max-h-[400px]">
            <img 
              src={notification.fileUrl} 
              alt={notification.title} 
              className="rounded-2xl shadow-md max-w-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="flex gap-x-230 justify-between w-full px-10">
          <span className="text-white bg-secondary text-sm font-semibold rounded-full px-10 py-2 mt-6">
            {new Date().toLocaleDateString()}
          </span>
          <Button 
            variant="secondary" 
            className="text-sm font-semibold rounded-full px-10 py-2 mt-6"
            onClick={handleBack}
          >
            Kembali
          </Button>
        </div>

        <h1 className="text-base font-semibold mt-4 text-center flex justify-center items-center bg-black text-white h-14 w-17/18 rounded-2xl px-4">
          {notification.title}
        </h1>

        <div className="flex flex-col my-6 mb-8 justify-center border-2 text-black w-17/18 rounded-2xl">
          <p className="text-sm p-6 text-justify whitespace-pre-wrap">
            {notification.content}
          </p>
          
          {notification.fileUrl && (
            <div className="bg-tertiary h-30 w-23 mx-6 mb-6 rounded-lg flex justify-center items-center">
              <a
                href={notification.fileUrl}
                className="text-black-3 text-start text-4xl "
                download
              >
                <BiSolidFilePdf />
              </a>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full mb-10 px-4">
          <div className="flex flex-col gap-3 mx-6 border-2 border-black rounded-2xl px-4 py-4">
            <Button 
              className="w-40 rounded-full bg-secondary cursor-pointer text-white px-6 py-2 text-sm hover:bg-secondary/90"
              onClick={handleReply}
            >
              Reply
            </Button>
            <input 
              type="text" 
              placeholder="Masukkan tautan berkas" 
              className="w-full px-4 py-2 text-sm border-2 border-black rounded-full focus:outline-none focus:border-secondary"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleReply();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;