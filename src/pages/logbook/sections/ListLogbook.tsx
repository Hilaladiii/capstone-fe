import { useState } from "react";
import { useLogbookStudent } from "../../../common/hooks/useLogbookStudent";
import { Logbook } from "../../../common/types/logbook.type";
import BadgeDateTime from "../../../components/ui/badge-datetime";
import LinkDocument from "../components/LinkDocument";
import EditLogbookModal from "../components/EditLogbookModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const ListLogbook = () => {
  const { data } = useLogbookStudent();
  const logbooks = data?.data.data as Logbook[];
  
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    logbook: Logbook | null;
  }>({
    isOpen: false,
    logbook: null,
  });
  
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    logbookId: string;
    description: string;
  }>({
    isOpen: false,
    logbookId: "",
    description: "",
  });

  const handleEdit = (logbook: Logbook) => {
    setEditModal({
      isOpen: true,
      logbook,
    });
  };

  const handleDelete = (logbook: Logbook) => {
    setDeleteModal({
      isOpen: true,
      logbookId: logbook.logbookId,
      description: logbook.description,
    });
  };

  const closeEditModal = () => {
    setEditModal({
      isOpen: false,
      logbook: null,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      logbookId: "",
      description: "",
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center px-16">
        <div className="bg-secondary text-white w-1/3 flex items-center py-3 justify-center rounded-xl mb-8">
          <h3 className="text-base font-semibold">Data Kegiatan Praktik kerja lapang</h3>
        </div>
        <table className="w-full table-fixed bg-white border-collapse border border-black">
          <thead>
            <tr className="border border-black">
              <th className="p-5 w-16 border border-black font-semibold">No</th>
              <th className="p-5 text-left border border-black font-semibold">Uraian Kegiatan</th>
              <th className="p-5 text-left border border-black font-semibold">Feedback</th>
              <th className="p-5 w-24 border border-black font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(logbooks) && logbooks.length !== 0 ? (
              logbooks.map((logbook, index) => (
                <tr key={logbook.logbookId || index} className="border border-black">
                  <td className="p-5 text-center border-r">{index + 1}</td>
                  <td className="p-5 border-r">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <BadgeDateTime datetime={logbook.date} type="date" />
                        <BadgeDateTime datetime={logbook.duration} type="time" />
                      </div>
                      <p className="text-sm text-gray-700">{logbook.description}</p>
                      <div className="mt-2">
                        <LinkDocument fileUrl={logbook.fileUrl} fileOriginalName={logbook.fileOriginalName} />
                      </div>
                    </div>
                  </td>
                  <td className="p-5 border-r">
                    <p className="text-sm text-gray-700">{logbook.note || "-"}</p>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-1">
                      <button 
                        onClick={() => handleEdit(logbook)}
                        className="text-gray-600 hover:text-blue-500 p-1"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(logbook)}
                        className="text-gray-600 hover:text-red-500 p-1"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-5 text-center text-gray-500">
                  Data Kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editModal.logbook && (
        <EditLogbookModal
          logbook={editModal.logbook}
          isOpen={editModal.isOpen}
          onClose={closeEditModal}
        />
      )}

      <DeleteConfirmationModal
        logbookId={deleteModal.logbookId}
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        logbookDescription={deleteModal.description}
      />
    </>
  );
};

export default ListLogbook;