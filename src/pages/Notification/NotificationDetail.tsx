import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../common/hooks/useAuth";
import apiService, { Announcement } from "../../services/announcement.service";
import HeaderLayout from "../../components/layout/HeaderLayout";
import FooterLayout from "../../components/layout/FooterLayout";
import { Button } from "../../components/ui/button";

const NotificationDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (token && id) {
          const response = await apiService.getSingleAnnouncement(token, id);
          setAnnouncement(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch announcement details", error);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id, token]);

  if (!announcement) {
    return (
      <div className="flex flex-col items-center bg-primary min-h-screen">
        <HeaderLayout />
        <div className="text-white font-bold text-xl py-10">Loading...</div>
        <FooterLayout />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-primary min-h-screen">
      <HeaderLayout />
      <div className="flex flex-col items-center justify-center px-20 pt-20">
        <h1 className="text-3xl text-center font-bold mb-8 mt-6 text-white">Notifikasi</h1>
        <div className="h-2 w-90 flex items-center justify-center px-10 bg-gradient-to-l from-secondary from-60% to-primary to-100% mb-10" />
      </div>

      <div className="text-black bg-white w-full max-w-7xl rounded-2xl flex flex-col items-center justify-center mb-10 shadow-lg">
        {announcement.imageUrl && (
          <div className=" w-full flex justify-center max-h-[400px]">
            <img src={announcement.imageUrl} alt={announcement.title} className="rounded-2xl shadow-md max-w-full" />
          </div>
        )}

        <div className="flex gap-x-230 justify-between">
          <span className="text-white bg-secondary text-sm rounded-full px-10 py-2 mt-6">{new Date(announcement.createdAt).toLocaleDateString()}</span>
          <Button variant="secondary" className="text-sm rounded-full px-10 py-2 mt-6">
            Kembali
          </Button>
        </div>

        <h1 className="text-lg font-semibold mt-4 text-center flex justify-center items-center bg-black text-white h-14 w-17/18 rounded-2xl">{announcement.title}</h1>

        <div className="flex flex-col my-6 mb-8 justify-center items-center border-2 text-black w-17/18 rounded-2xl">
          <p className="text-lg p-6 text-justify">{announcement.content}</p>
          {announcement.fileUrl && (
            <div className="text-start items-start flex mb-6 border-2 border-secondary rounded-2xl p-2 justify-center ">
              <a href={announcement.fileUrl} className="text-secondary hover:text-secondary text-start font-semibold" download>
                Unduh Dokumen
              </a>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full mb-10 px-4">
          <div className="flex flex-col gap-3 mx-6 border-2 border-black rounded-2xl px-4 py-4">
            <Button className="w-40 rounded-full bg-secondary cursor-pointer text-white px-6 py-2 text-sm">Reply</Button>
            <input type="text" placeholder="Masukkan tautan berkas" className="w-full px-4 py-2 text-sm border-2 border-black rounded-full" />
          </div>
        </div>
      </div>

      <FooterLayout />
    </div>
  );
};

export default NotificationDetail;
