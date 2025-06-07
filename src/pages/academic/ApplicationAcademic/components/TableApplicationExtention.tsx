import StatusOption from "../../../../components/shared/StatusOption";
import { Button } from "../../../../components/ui/button";
import { useInternshipData } from "../../../../common/hooks/useInsternship";
import { InternshipType } from "../../../../common/types/internship.type";

const TableApplicationExtension = () => {
  const { data, isLoading, error } = useInternshipData(InternshipType.EXTENSION);

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">Error loading data</div>;
  if (!data || data.length === 0) return <div className="text-center p-4">No data available</div>;

  return (
    <div className="overflow-auto max-w-[90rem]">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-primary text-white">
            <th className="p-4 whitespace-nowrap">No</th>
            <th className="p-4 whitespace-nowrap">Status Pengajuan</th>
            <th className="p-4 whitespace-nowrap">Dokumen</th>
            <th className="p-4 whitespace-nowrap">Nama Mahasiswa</th>
            <th className="p-4 whitespace-nowrap">NIM</th>
            <th className="p-4 whitespace-nowrap">No.HP</th>
            <th className="p-4 whitespace-nowrap">Email</th>
            <th className="p-4 whitespace-nowrap">SKS Lulus</th>
            <th className="p-4 whitespace-nowrap">Nama Instansi</th>
            <th className="p-4 whitespace-nowrap">Alamat Instansi</th>
            <th className="p-4 whitespace-nowrap">Periode Awal</th>
            <th className="p-4 whitespace-nowrap">Periode Akhir</th>
            <th className="p-4 whitespace-nowrap">Periode Perpanjangan Awal</th>
            <th className="p-4 whitespace-nowrap">Periode Perpanjangan Akhir</th>
            <th className="p-4 whitespace-nowrap">Alasan Perpanjangan</th>
            <th className="p-4 whitespace-nowrap">Tanggal Pengajuan</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.documentId} className="border-b hover:bg-gray-50">
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2 text-center">
                <StatusOption value={item.status} onChange={() => {}} />
              </td>
              <td className="p-2 text-center">
                <div className="flex flex-col gap-1">
                  {item.documentFiles.map((file) => (
                    <Button 
                      key={file.fileId}
                      className="px-3 py-1 text-xs whitespace-nowrap"
                      onClick={() => window.open(file.fileUrl, '_blank')}
                    >
                      {file.type === 'INTERNSHIP_APPLICATION_FILE' ? 'Surat Pengajuan' : 
                       file.type === 'INTERNSHIP_EXTENSION_FILE' ? 'Surat Perpanjangan' :
                       'Dokumen'}
                    </Button>
                  ))}
                </div>
              </td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.nim}</td>
              <td className="p-2">{item.phoneNumber}</td>
              <td className="p-2">{item.email}</td>
              <td className="p-2">{item.internshipExtension.totalSks}</td>
              <td className="p-2">{item.internshipExtension.agencyName}</td>
              <td className="p-2">{item.internshipExtension.agencyAddress}</td>
              <td className="p-2">
                {new Date(item.internshipExtension.startDatePeriod).toLocaleDateString('id-ID')}
              </td>
              <td className="p-2">
                {new Date(item.internshipExtension.finishDatePeriod).toLocaleDateString('id-ID')}
              </td>
              <td className="p-2">
                {new Date(item.internshipExtension.startExtensionDatePeriod).toLocaleDateString('id-ID')}
              </td>
              <td className="p-2">
                {new Date(item.internshipExtension.finishExtensionDatePeriod).toLocaleDateString('id-ID')}
              </td>
              <td className="p-2">{item.internshipExtension.reasonExtension}</td>
              <td className="p-2">
                {new Date(item.createdAt).toLocaleDateString('id-ID')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableApplicationExtension;