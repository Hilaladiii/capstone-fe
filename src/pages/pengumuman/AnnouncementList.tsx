import { useEffect, useState } from "react";
import { useAuth } from "../../common/hooks/useAuth";
import FooterLayout from "../../components/layout/FooterLayout";
import HeaderLayout from "../../components/layout/HeaderLayout";
import apiService, { Announcement } from "../../services/announcement.service";

const ITEMS_PER_PAGE = 5;

const AnnouncementList = () => {
  const { token, isAuthenticated } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setAnnouncements([]);
      setTotalItems(0);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await apiService.getAnnouncements(token, 1, 1000);
        let anns: Announcement[] = response?.data?.announcements ?? [];
        anns = anns.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setTotalItems(anns.length);

        const pagedAnns = anns.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        );

        const details = await Promise.all(
          pagedAnns.map(async (a: Announcement) => {
            const id = String(a.announcementId);
            const detail = await apiService.getSingleAnnouncement(token, id);
            return { ...a, content: detail.data.content, announcementId: id };
          })
        );
        setAnnouncements(details);
      } catch {
        setAnnouncements([]);
        setTotalItems(0);
      }
    };

    fetchData();
  }, [isAuthenticated, token, currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const goToDetail = (announcementId: string) => {
    window.location.href = `/detailpengumuman/${announcementId}`;
  };

  return (
    <div>
      <HeaderLayout />
      <section className="min-h-screen bg-primary flex flex-col justify-center items-center pt-20 pb-10">
        <div className="px-2">
          <h1 className="text-3xl text-center font-bold mb-8 mt-6 text-white">Pengumuman</h1>
          <div className="h-2 w-90 flex items-center justify-center px-10 bg-gradient-to-l from-secondary from-60% to-primary to-100% mb-10" />
        </div>

        <div className="w-full">
          <ul className="flex flex-col gap-5 w-full max-w-6xl mx-auto px-4 md:px-10">
            {announcements.length === 0 ? (
              <li className="text-xl font-medium text-center text-white">
                Tidak ada pengumuman.
              </li>
            ) : (
              announcements.map((a) => (
                <li
                  key={a.announcementId}
                  onClick={() => goToDetail(a.announcementId)}
                  role="button"
                  tabIndex={0}
                  aria-label="Lihat detail pengumuman"
                  className={`bg-white w-full py-4 px-12 font-semibold text-sm text-[#27272A]
                    flex flex-col shadow cursor-pointer h-26 transition
                    hover:shadow-lg hover:scale-[1.01] outline-none
                    focus:ring focus:ring-secondary rounded-xl`}
                >
                  <span className="mb-2 text-secondary">
                    {new Date(a.createdAt).toLocaleDateString("id-ID", { dateStyle: "medium" })}
                  </span>
                  <span
                    className="block max-w-full font-normal text-sm leading-relaxed whitespace-pre-line text-justify
                      overflow-hidden text-ellipsis line-clamp-3"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {a.content}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex gap-2" aria-label="Pagination">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-white rounded-lg transition border ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-support2"
                }`}
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-4 py-2 rounded-lg font-bold ${
                    currentPage === i + 1
                      ? "bg-support2 text-white shadow"
                      : "bg-white text-[#27272A]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-white rounded-lg transition border ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-secondary/60"
                }`}
              >
                 &gt;
              </button>
            </nav>
          </div>
        )}
      </section>
      <FooterLayout />
    </div>
  );
};

export default AnnouncementList;
