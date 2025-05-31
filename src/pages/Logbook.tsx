import { useState, useEffect } from "react";
import { useAuth } from "../common/hooks/useAuth";
import { fetchLogbooks, createLogbook } from "../services/logbook.service";
import { Button } from "../components/ui/button";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";

interface Logbook {
  logbook_id: string;
  description: string;
  duration: number; // durasi dalam jam
  created_at: string;
  feedback?: string;
  imageUrl: string;
  imageOriginalName: string;
  supportLink?: string; // misal link pendukung
}

export default function CreateLogbookForm() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState("0");
  const [date, setDate] = useState("");
  const [logbooks, setLogbooks] = useState<Logbook[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const getLogbooks = async () => {
      try {
        if (token) {
          const fetchedLogbooks = await fetchLogbooks(token);
          setLogbooks(fetchedLogbooks);
        }
      } catch (error) {
        console.error("Error fetching logbooks:", error);
      }
    };
    getLogbooks();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !file) {
      alert("Deskripsi dan file wajib diisi");
      return;
    }
    if (!token) {
      alert("Token tidak ditemukan. Pastikan Anda sudah login.");
      return;
    }
    try {
      await createLogbook(description, file, duration, token);
      alert("Logbook berhasil ditambahkan");
      const updatedLogbooks = await fetchLogbooks(token);
      setLogbooks(updatedLogbooks);
      setDescription("");
      setFile(null);
      setDuration("0");
      setDate("");
    } catch (error) {
      console.error("Error adding logbook:", error);
      alert("Gagal menambahkan logbook");
    }
  };

  return (
    <main className="bg-primary items-center flex flex-col justify center w-full">
      <section className="w-full pt-30 text-white items-center justify-center flex flex-col mb-10">
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 w-3/4">
          <h2 className="text-xl font-semibold text-orange-400">
            Tambahkan Data Kegiatan PKL
          </h2>

          <div>
            <label className="block mb-1">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Durasi Kegiatan (Dalam Jam)</label>
            <input
              type="number"
              placeholder="Contoh: 3"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              min={0}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Deskripsi Kegiatan</label>
            <textarea
              placeholder="Masukkan deskripsi kegiatan"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Upload File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>
        </form>
        <Button
          variant="secondary"
          className="cursor-pointer px-16 py-3 flex items-center"
        >
          Submit
        </Button>
      </section>

      <section className="w-full flex flex-col items-center">
        <div className="bg-secondary text-white w-1/3 flex items-center py-3 justify-center rounded-2xl my-10">
          <h3 className="text-lg font-semibold">
            Data Kegiatan Praktik kerja lapang
          </h3>
        </div>
        <table className="border-collapse border-4 border-black text-sm w-5/6 bg-white">
          <thead>
            <tr className="bg-gray-100 text-black h-20">
              <th className="border-4 border-black p-4 w-14">No</th>
              <th className="border-4 border-black p-4 w-[300px]">
                Uraian Kegiatan
              </th>
              <th className="border-4 border-black p-4 w-[200px]">Feedback</th>
              <th className="border-4 border-black p-4 w-14">Action</th>
            </tr>
          </thead>

          <tbody>
            {logbooks.map((logbook, i) => (
              <tr
                key={logbook.logbook_id}
                className="odd:bg-white even:bg-gray-50 align-top text-black"
              >
                <td className="border-4 border-black p-2 text-center">
                  {i + 1}
                </td>

                <td className="border-4 border-black p-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-secondary text-white rounded-full px-3 py-1 text-xs font-semibold">
                      {new Date(logbook.created_at).toLocaleDateString("id-ID")}
                    </span>
                    <span className="bg-accent text-white rounded-full px-3 py-1 text-xs font-semibold">
                      {logbook.duration} jam
                    </span>
                  </div>
                  <p>{logbook.description}</p>

                  {/* Tampilkan gambar/file jika ada */}
                  {logbook.imageUrl && (
                    <img
                      src={logbook.imageUrl}
                      alt={logbook.imageOriginalName}
                      className="w-32 h-32 object-cover rounded mt-2 border border-black"
                    />
                  )}
                </td>

                <td className="border-4 border-black p-2">
                  <p className="text-xs">{logbook.feedback || "-"}</p>
                </td>

                <td className="border-4 border-black p-2 text-center">
                  <FiEdit
                    className="inline-block text-lg text-black hover:text-secondary mr-2"
                    title="Edit"
                    onClick={() => alert(`Edit logbook ${logbook.logbook_id}`)}
                  />
                  <RiDeleteBin7Line
                    className="inline-block text-lg text-black hover:text-secondary"
                    title="Delete"
                    onClick={() =>
                      alert(`Delete logbook ${logbook.logbook_id}`)
                    }
                  />
                </td>
              </tr>
            ))}

            {logbooks.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-400">
                  Tidak ada logbook yang ditambahkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
