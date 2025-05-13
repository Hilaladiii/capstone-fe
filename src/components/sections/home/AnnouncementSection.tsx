import { useEffect, useState } from "react";
import apiService, { Announcement } from "../../../services/announcement.service";
import { useAuth } from "../../../common/hooks/useAuth";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom"; 

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const { token, isAuthenticated } = useAuth();

  const fetchAnnouncements = async () => {
    if (isAuthenticated && token) {
      try {
        const response = await apiService.getAnnouncements(token, 1, 10);

        if (response && response.data && Array.isArray(response.data.announcements)) {
          const sortedData = [...response.data.announcements].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ).slice(0, 3);

          const announcementsWithContent = await Promise.all(
            sortedData.map(async (announcement: Announcement) => {
              const singleResponse = await apiService.getSingleAnnouncement(token, announcement.announcementId);
              return {
                ...announcement,
                content: singleResponse.data.content,
              };
            })
          );
          setAnnouncements(announcementsWithContent);
        } else {
          setAnnouncements([]);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setAnnouncements([]);
      }
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token]);

  return (
    <section className="h-lvh bg-primary flex flex-col justify-center text-start mb-20">
      <h1 className="text-3xl font-bold mb-8 mt-0 px-24 text-white">Pengumuman</h1>
      <div className="h-2 w-[420px] bg-gradient-to-l from-secondary from-60% to-primary to-100% mb-10" />
      <ul className="flex flex-col gap-5">
        {announcements.length === 0 ? (
          <li className="text-xl font-medium text-center mt-12 text-white">
            Tidak ada pengumuman.
          </li>
        ) : (
          announcements.map((announcement) => (
            <li
              key={announcement.announcementId}
              className="bg-white rounded-xl mx-16 px-6 py-4 font-semibold text-sm text-[#27272A] flex flex-col"
            >
              <span className="mb-2 text-secondary">
                {announcement.createdAt
                  ? new Date(announcement.createdAt).toLocaleDateString()
                  : "-"}
              </span>
              <span>
                {announcement.content}
              </span>
            </li>
          ))
        )}
      </ul>
      <div className="flex justify-center mt-6">
        <Link to="/notification">
          <Button variant="secondary" className="cursor-pointer px-30">Lainnya</Button>
        </Link>
      </div>
    </section>
  );
};

export default AnnouncementSection;
