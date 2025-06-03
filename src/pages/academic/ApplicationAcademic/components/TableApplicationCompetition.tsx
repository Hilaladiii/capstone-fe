// import StatusOption from "../../../../components/shared/StatusOption";
// import { Button } from "../../../../components/ui/button";
// import { useInternship } from "../../../../common/hooks/useInsternship";
// import { IntershipType } from "../../../../common/types/internshipp.type";

// const TableApplicationCompetition = () => {
//   const { data } = useInternship(IntershipType.COMPETITION);
//   return (
//     <div className="overflow-auto max-w-[90rem]">
//       <table className="min-w-full border-collapse">
//         <thead>
//           <tr className="bg-primary text-white">
//             <th className="p-4 whitespace-nowrap">No</th>
//             <th className="p-4 whitespace-nowrap">Status Pengajuan</th>
//             <th className="p-4 whitespace-nowrap">Dokumen</th>
//             <th className="p-4 whitespace-nowrap">Nama Mahasiswa</th>
//             <th className="p-4 whitespace-nowrap">NIM</th>
//             <th className="p-4 whitespace-nowrap">No.HP</th>
//             <th className="p-4 whitespace-nowrap">Email</th>
//             <th className="p-4 whitespace-nowrap">SKS Lulus</th>
//             <th className="p-4 whitespace-nowrap">Nama Lomba</th>
//             <th className="p-4 whitespace-nowrap">Kategori Lomba</th>
//             <th className="p-4 whitespace-nowrap">Penyelenggara</th>
//             <th className="p-4 whitespace-nowrap">Informasi Lomba</th>
//             <th className="p-4 whitespace-nowrap">Tingkat Lomba</th>
//             <th className="p-4 whitespace-nowrap">Juara Lomba</th>
//             <th className="p-4 whitespace-nowrap">Pembimbing</th>
//             <th className="p-4 whitespace-nowrap">Waktu Pelaksanaan</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={item.documentId} className="border-b">
//               <td className="p-2 text-center">{index + 1}</td>
//               <td className="p-2 text-center">
//                 <StatusOption value={item.status} onChange={() => {}} />
//               </td>
//               <td className="p-2 text-center">
//                 <Button className="px-3 py-2 text-sm whitespace-nowrap">
//                   Lihat Dokumen
//                 </Button>
//               </td>
//               <td className="p-2">{item.name}</td>
//               <td className="p-2">{item.nim}</td>
//               <td className="p-2">{item.phoneNumber}</td>
//               <td className="p-2">{item.email}</td>
//               <td className="p-2">
//                 {item.internshipApplicationCompetition.totalSks}
//               </td>
//               <td className="p-2">
//                 {item.internshipApplicationCompetition.competitionName}
//               </td>
//               <td className="p-2">
//                 {item.internshipApplicationCompetition.competitionCategory}
//               </td>
//               <td className="p-2">
//                 {item.internshipApplicationCompetition.competitionOrganizer}
//               </td>
//               <td className="p-2">
//                 {item.internshipApplicationCompetition.competitionInformation}
//               </td>
//               <td className="p-2">
//                 {item.internshipApplicationCompetition.competitionLevel}
//               </td>
//               <td className="p-2">
//                 {item.internshipApplicationCompetition.competitionWinner}
//               </td>
//               <td className="p-2">
//                 {item.internshipApplicationCompetition.competitionSupervisor}
//               </td>
//               <td className="p-2">
//                 {new Date(
//                   item.internshipApplicationCompetition.competitionStartDate
//                 ).toLocaleDateString()}{" "}
//                 -{" "}
//                 {new Date(
//                   item.internshipApplicationCompetition.competitionFinishDate
//                 ).toLocaleDateString()}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableApplicationCompetition;
