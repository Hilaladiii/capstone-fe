import { useState, ChangeEvent } from "react";
import StatusOption from "../../../../components/shared/StatusOption";
import { Button } from "../../../../components/ui/button";
import { useInternshipData, useUpdateCompetitionStatus } from "../../../../common/hooks/useInsternship";
import { InternshipType, InternshipStatus, UpdateCompetitionStatusData } from "../../../../common/types/internship.type";

interface CompetitionApplicationItem {
  documentId: string;
  status: string;
  name: string;
  nim: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  documentFiles: Array<{
    fileId: string;
    fileUrl: string;
    type: string;
  }>;
  internshipApplicationCompetition: {
    totalSks: string;
    competitionName: string;
    competitionCategory: string;
    competitionOrganizer: string;
    competitionInformation: string;
    competitionLevel: string;
    competitionWinner: string;
    competitionSupervisor: string;
    competitionStartDate: string;
    competitionFinishDate: string;
  };
}

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (files: UpdateCompetitionStatusData) => void;
  status: InternshipStatus;
}

interface RejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: Array<{
    fileId: string;
    fileUrl: string;
    type: string;
  }>;
}

const DocumentModal = ({ isOpen, onClose, documents }: DocumentModalProps) => {
  const getDocumentName = (type: string) => {
    switch (type) {
      case 'STUDY_RESULT_CARD_FILE':
        return 'Kartu Hasil Studi (KHS)';
      case 'PROPOSAL_COMPETITION_SERTIFICATION_FILE':
        return 'Proposal/Sertifikat Lomba';
      case 'INTERNSHIP_VERIFICATION_COMPETITION_LETTER_FILE':
        return 'Surat Verifikasi Lomba';
      case 'INTERNSHIP_DETERMINATION_COMPETITION_LETTER_FILE':
        return 'Surat Penetapan Lomba';
      default:
        return 'Dokumen';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Daftar Dokumen
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Klik dokumen untuk membuka dalam tab baru
          </p>
        </div>
        
        <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
          {!documents || documents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">Tidak ada dokumen tersedia</p>
              <p className="text-sm text-gray-400">
                Dokumen mungkin belum diupload atau masih dalam proses
              </p>
            </div>
          ) : (
            documents.map((doc) => (
              <div 
                key={doc.fileId}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {getDocumentName(doc.type)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {doc.type.replace(/_/g, ' ').toLowerCase()}
                  </p>
                  {doc.fileUrl && (
                    <p className="text-xs text-blue-600 mt-1">
                      File tersedia
                    </p>
                  )}
                </div>
                <Button
                  onClick={() => {
                    if (doc.fileUrl) {
                      window.open(doc.fileUrl, '_blank');
                    } else {
                      alert('URL file tidak tersedia');
                    }
                  }}
                  className="ml-3 px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {doc.fileUrl ? 'Buka' : 'Tidak tersedia'}
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
};

const RejectionModal = ({ isOpen, onClose, onSubmit }: RejectionModalProps) => {
  const [rejectionReason, setRejectionReason] = useState("");

  const handleSubmit = () => {
    if (rejectionReason.trim()) {
      onSubmit(rejectionReason.trim());
      setRejectionReason("");
      onClose();
    }
  };

  const handleClose = () => {
    setRejectionReason("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Alasan Penolakan
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Berikan alasan mengapa dokumen ini ditolak
          </p>
        </div>
        
        <div className="mb-6">
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Masukkan alasan penolakan..."
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button 
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Batal
          </Button>
          <Button 
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tolak Dokumen
          </Button>
        </div>
      </div>
    </div>
  );
};

const FileUploadModal = ({ isOpen, onClose, onSubmit, status }: FileUploadModalProps) => {
  const [files, setFiles] = useState<UpdateCompetitionStatusData>({
    status,
    internshipVerificationCompetitionLetterFile: null,
    internshipDeterminationCompetitionLetterFile: null,
    studyResultCardFile: null,
    proposalCompetitionSertificationFile: null,
  });

  const handleFileChange = (field: keyof UpdateCompetitionStatusData, file: File | null) => {
    setFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = () => {
    onSubmit(files);
    onClose();
  };

  const needsVerificationLetter = false; 
  const needsDeterminationLetter = status === "COMPLETED";
  const needsStudyCard = status === "COMPLETED";
  const needsProposalCert = status === "COMPLETED";

  const getModalTitle = () => {
    switch (status) {
      case "COMPLETED":
        return "Upload Dokumen Pelengkap untuk Penyelesaian";
      default:
        return `Upload File untuk Status: ${status}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {getModalTitle()}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Upload semua dokumen yang diperlukan untuk menyelesaikan proses
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          {needsVerificationLetter && (
            <div>
              <label htmlFor="verificationLetter" className="block text-sm font-medium text-gray-700 mb-2">
                Surat Verifikasi Lomba <span className="text-red-500">*</span>
              </label>
              <input
                id="verificationLetter"
                type="file"
                accept=".pdf,.doc,.docx"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => handleFileChange('internshipVerificationCompetitionLetterFile', e.target.files?.[0] || null)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          )}

          {needsDeterminationLetter && (
            <div>
              <label htmlFor="determinationLetter" className="block text-sm font-medium text-gray-700 mb-2">
                Surat Penetapan Lomba <span className="text-red-500">*</span>
              </label>
              <input
                id="determinationLetter"
                type="file"
                accept=".pdf,.doc,.docx"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => handleFileChange('internshipDeterminationCompetitionLetterFile', e.target.files?.[0] || null)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          )}

          {needsStudyCard && (
            <div>
              <label htmlFor="studyCard" className="block text-sm font-medium text-gray-700 mb-2">
                Kartu Hasil Studi <span className="text-red-500">*</span>
              </label>
              <input
                id="studyCard"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => handleFileChange('studyResultCardFile', e.target.files?.[0] || null)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: PDF, JPG, PNG (Max 5MB)
              </p>
            </div>
          )}

          {needsProposalCert && (
            <div>
              <label htmlFor="proposalCert" className="block text-sm font-medium text-gray-700 mb-2">
                Proposal/Sertifikat Lomba <span className="text-red-500">*</span>
              </label>
              <input
                id="proposalCert"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => handleFileChange('proposalCompetitionSertificationFile', e.target.files?.[0] || null)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <Button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Batal
          </Button>
          <Button 
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Selesaikan Proses
          </Button>
        </div>
      </div>
    </div>
  );
};

const TableApplicationCompetition = () => {
  const { data, isLoading, error } = useInternshipData(InternshipType.COMPETITION);
  const updateStatusMutation = useUpdateCompetitionStatus();
  
  const [fileUploadModal, setFileUploadModal] = useState<{
    isOpen: boolean;
    documentId: string;
    status: InternshipStatus;
  }>({
    isOpen: false,
    documentId: "",
    status: "DOCUMENT_VERIFICATION"
  });

  const [rejectionModal, setRejectionModal] = useState<{
    isOpen: boolean;
    documentId: string;
  }>({
    isOpen: false,
    documentId: ""
  });

  const [documentModal, setDocumentModal] = useState<{
    isOpen: boolean;
    documents: Array<{
      fileId: string;
      fileUrl: string;
      type: string;
    }>;
  }>({
    isOpen: false,
    documents: []
  });

  const renderMultiLineText = (text: string) => {
    if (!text) return '-';
    
    const items = text.split(',').map(item => item.trim()).filter(item => item);
    
    if (items.length <= 1) {
      return <span>{text}</span>;
    }
    
    return (
      <div className="flex flex-col gap-1">
        {items.map((item, index) => (
          <div key={index} className="py-0.5">
            {item}
          </div>
        ))}
      </div>
    );
  };

  const handleDocumentView = (documents: Array<{ fileId: string; fileUrl: string; type: string; }>) => {
    setDocumentModal({
      isOpen: true,
      documents: documents || []
    });
  };

  const handleStatusChange = (documentId: string, event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as InternshipStatus;

    if (updateStatusMutation.isPending) {
      return;
    }

    if (newStatus === "DOCUMENT_REVISION") {
      setRejectionModal({
        isOpen: true,
        documentId
      });
      return;
    }
    
    updateStatusMutation.mutate({
      documentId,
      data: { status: newStatus }
    });
  };

  const handleRejectionSubmit = (rejectionReason: string) => {
    if (updateStatusMutation.isPending) {
      return;
    }
    
    updateStatusMutation.mutate({
      documentId: rejectionModal.documentId,
      data: { 
        status: "DOCUMENT_REVISION",
        rejectionReason: rejectionReason
      }
    }, {
      onSuccess: () => {
        setRejectionModal({ isOpen: false, documentId: "" });
      }
    });
  };

  const handleFileUploadSubmit = (files: UpdateCompetitionStatusData) => {
    if (updateStatusMutation.isPending) {
      return;
    }
    
    updateStatusMutation.mutate({
      documentId: fileUploadModal.documentId,
      data: files
    }, {
      onSuccess: () => {
        setFileUploadModal({ isOpen: false, documentId: "", status: "DOCUMENT_VERIFICATION" });
      }
    });
  };

  const handleCloseFileModal = () => {
    setFileUploadModal({ isOpen: false, documentId: "", status: "DOCUMENT_VERIFICATION" });
  };

  const handleCloseDocumentModal = () => {
    setDocumentModal({
      isOpen: false,
      documents: []
    });
  };

  const handleCloseRejectionModal = () => {
    setRejectionModal({ isOpen: false, documentId: "" });
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">Error loading data</div>;
  if (!data || data.length === 0) return <div className="text-center p-4">No data available</div>;

  return (
    <>
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
              <th className="p-4 whitespace-nowrap">Nama Lomba</th>
              <th className="p-4 whitespace-nowrap">Kategori Lomba</th>
              <th className="p-4 whitespace-nowrap">Penyelenggara</th>
              <th className="p-4 whitespace-nowrap">Informasi Lomba</th>
              <th className="p-4 whitespace-nowrap">Tingkat Lomba</th>
              <th className="p-4 whitespace-nowrap">Juara Lomba</th>
              <th className="p-4 whitespace-nowrap">Pembimbing</th>
              <th className="p-4 whitespace-nowrap">Waktu Pelaksanaan</th>
              <th className="p-4 whitespace-nowrap">Tanggal Pengajuan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: CompetitionApplicationItem, index: number) => (
              <tr key={item.documentId} className="border-b hover:bg-gray-50">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">
                  <StatusOption 
                    value={item.status} 
                    onChange={(event) => handleStatusChange(item.documentId, event)}
                  />
                </td>
                <td className="p-2 text-center">
                  <Button
                    onClick={() => {
                      console.log('Button clicked, documents:', item.documentFiles);
                      handleDocumentView(item.documentFiles);
                    }}
                    className="px-3 py-1 text-xs text-white border-2 border-black rounded-full w-32"
                  >
                    Lihat Berkas ({item.documentFiles?.length || 0})
                  </Button>
                </td>
                <td className="p-2 align-top">
                  {renderMultiLineText(item.name)}
                </td>
                <td className="p-2 align-top">
                  {renderMultiLineText(item.nim)}
                </td>
                <td className="p-2 align-top">
                  {renderMultiLineText(item.phoneNumber)}
                </td>
                <td className="p-2 align-top">
                  {renderMultiLineText(item.email)}
                </td>
                <td className="p-2 align-top">
                  {renderMultiLineText(item.internshipApplicationCompetition.totalSks)}
                </td>
                <td className="p-2">
                  {item.internshipApplicationCompetition.competitionName}
                </td>
                <td className="p-2">
                  {item.internshipApplicationCompetition.competitionCategory}
                </td>
                <td className="p-2">
                  {item.internshipApplicationCompetition.competitionOrganizer}
                </td>
                <td className="p-2">
                  {item.internshipApplicationCompetition.competitionInformation}
                </td>
                <td className="p-2">
                  {item.internshipApplicationCompetition.competitionLevel}
                </td>
                <td className="p-2">
                  {item.internshipApplicationCompetition.competitionWinner}
                </td>
                <td className="p-2">
                  {item.internshipApplicationCompetition.competitionSupervisor}
                </td>
                <td className="p-2">
                  {new Date(
                    item.internshipApplicationCompetition.competitionStartDate
                  ).toLocaleDateString('id-ID')}{" "}
                  -{" "}
                  {new Date(
                    item.internshipApplicationCompetition.competitionFinishDate
                  ).toLocaleDateString('id-ID')}
                </td>
                <td className="p-2">
                  {new Date(item.createdAt).toLocaleDateString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DocumentModal
        isOpen={documentModal.isOpen}
        onClose={handleCloseDocumentModal}
        documents={documentModal.documents}
      />

      <RejectionModal
        isOpen={rejectionModal.isOpen}
        onClose={handleCloseRejectionModal}
        onSubmit={handleRejectionSubmit}
      />

      <FileUploadModal
        isOpen={fileUploadModal.isOpen}
        onClose={handleCloseFileModal}
        onSubmit={handleFileUploadSubmit}
        status={fileUploadModal.status}
      />
      
      {updateStatusMutation.isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Updating status...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableApplicationCompetition;