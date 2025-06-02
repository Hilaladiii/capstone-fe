import { useAnnouncements } from "../../../common/hooks/useAnnouncement";

const AnnouncementList = () => {
  const {
    data: announcementsResponse,
    isLoading,
    isError,
  } = useAnnouncements(1, 10, "desc", "");

  if (isLoading) {
    return <div>Loading announcements...</div>;
  }

  if (isError) {
    return <div>Error loading announcements</div>;
  }

  const announcements = announcementsResponse?.announcements || [];

  const sortedAnnouncements = announcements.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt).getTime();
    const dateB = new Date(b.updatedAt || b.createdAt).getTime();
    return dateB - dateA;
  });

  return (
    <section className="bg-primary flex flex-col max-h-screen overflow-hidden items-center py-10 pt-24">
      <h1 className="text-xl font-bold mb-4 px-24 text-secondary">
        Pengumuman
      </h1>
      <div className="h-2 w-70 bg-gradient-to-l from-secondary from-60% to-primary to-100% mb-10" />

      <div className="w-full overflow-y-auto">
        <ul className="flex flex-col gap-5 w-full">
          {sortedAnnouncements.length === 0 ? (
            <li className="text-lg font-medium text-center mt-12 text-white">
              Tidak ada pengumuman
            </li>
          ) : (
            sortedAnnouncements.map((announcement) => (
              <li
                key={announcement.announcementId}
                className="bg-white rounded-xl mx-20 px-6 py-4 font-medium text-sm text-black cursor-pointer"
                onClick={() =>
                  (window.location.href = `/pengumuman/${announcement.announcementId}`)
                }
              >
                <p className="mb-2 text-secondary font-semibold">
                  {announcement.updatedAt
                    ? new Date(announcement.updatedAt).toLocaleDateString()
                    : new Date(announcement.createdAt).toLocaleDateString()}
                </p>
                <p className="truncate">{announcement.title}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default AnnouncementList;
