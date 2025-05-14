import { useLogbookStudent } from "../../../common/hooks/useLogbookStudent";
import { Logbook } from "../../../common/types/logbook.type";
import BadgeDateTime from "../../../components/ui/badge-datetime";
import LinkDocument from "../components/LinkDocument";

const ListLogbook = () => {
  const { data } = useLogbookStudent();
  const logbooks = data?.data.data as Logbook[];
  return (
    <div className="mt-10">
      <table className="w-full table-fixed bg-white border-collapse border border-black">
        <thead>
          <tr className="border border-black">
            <th className="p-5 w-16 border border-black">No</th>
            <th className="p-5 text-left border border-black">
              Uraian Kegiatan
            </th>
            <th className="p-5 text-left border border-black">Feedback</th>
            <th className="p-5 w-24 border border-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(logbooks) && logbooks.length !== 0 ? (
            logbooks.map((logbook, index) => (
              <tr
                key={logbook.logbookId || index}
                className="border-b border-gray-200"
              >
                <td className="p-5 text-center border-r">{index + 1}</td>
                <td className="p-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <BadgeDateTime datetime={logbook.date} type="date" />
                      <BadgeDateTime datetime={logbook.duration} type="time" />
                    </div>
                    <p className="text-sm text-gray-700">
                      {logbook.description}
                    </p>
                    <div className="mt-2">
                      <LinkDocument
                        fileUrl={logbook.fileUrl}
                        fileOriginalName={logbook.fileOriginalName}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <p className="text-sm text-gray-700">{logbook.note || "-"}</p>
                </td>
                <td className="p-5">
                  <div className="flex justify-center gap-3">
                    <button className="text-gray-600 hover:text-blue-500">
                      p
                    </button>
                    <button className="text-gray-600 hover:text-red-500">
                      p
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
  );
};

export default ListLogbook;
