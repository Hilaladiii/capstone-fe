import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnnouncementService } from "../../../services/announcement/announcement.service";
import { Announcement } from "../../../common/types/announcement.type";
import HeaderLayout from "../../../components/layout/HeaderLayout";
import FooterLayout from "../../../components/layout/FooterLayout";
import { Button } from "../../../components/ui/button";
import { BiSolidFilePdf } from "react-icons/bi";

const AnnouncementDetail: React.FC = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      if (!id) {
        setError("No announcement ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await AnnouncementService.getSingleAnnouncement(id);
        setAnnouncement(response.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching announcement details");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center bg-primary min-h-screen">
        <HeaderLayout />
        <div className="text-white font-bold text-xl py-10">Loading...</div>
        <FooterLayout />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center bg-primary min-h-screen">
        <HeaderLayout />
        <div className="text-white font-bold text-xl py-10">{error}</div>
        <FooterLayout />
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="flex flex-col items-center bg-primary min-h-screen">
        <HeaderLayout />
        <div className="text-white font-bold text-xl py-10">No announcement found</div>
        <FooterLayout />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-primary min-h-screen">
      <HeaderLayout />
      <div className="flex flex-col items-center justify-center px-20 pt-20">
        <h1 className="text-xl text-center font-semibold mb-4 mt-6 text-secondary">Pengumuman</h1>
        <div className="h-1 w-70 bg-gradient-to-l from-secondary from-60% to-primary to-100% mb-10" />
      </div>

      <div className="text-black bg-white w-full max-w-7xl rounded-3xl flex flex-col items-center justify-center mb-10 shadow-lg">
        {announcement.imageUrl && (
          <div className="w-full flex justify-center max-h-[227px]">
            <img src={announcement.imageUrl} alt={announcement.title} className="rounded-3xl shadow-md max-w-full" />
          </div>
        )}

        <div className="flex justify-between w-full px-10">
          <span className="text-white bg-secondary text-xs rounded-full px-10 py-2 mt-6">{announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString() : "-"}</span>
          <Button variant="secondary" className="text-xs rounded-full px-10 py-2 mt-6 cursor-pointer" onClick={() => window.history.back()}>
            Kembali
          </Button>
        </div>

        <h1 className="text-sm font-semibold mt-4 px-8 flex items-center bg-black text-white h-14 w-17/18 rounded-2xl">{announcement.title}</h1>

        <div className="flex flex-col my-6 mb-8  border-2 text-black w-17/18 rounded-2xl">
          <p className="text-xs font-semibold p-6 text-justify">{announcement.content}</p>
          {announcement.fileUrl && (
            <div className="bg-tertiary h-30 w-23 mx-6 mb-6 rounded-lg flex justify-center items-center">
              <a href={announcement.fileUrl} className="text-black-3 text-start text-4xl " download>
                <BiSolidFilePdf />
              </a>
            </div>
          )}
        </div>
      </div>

      <FooterLayout />
    </div>
  );
};

export default AnnouncementDetail;
