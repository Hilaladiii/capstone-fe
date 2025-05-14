interface LinkDocumentProps {
  fileOriginalName: string;
  fileUrl: string;
}

const LinkDocument = ({ fileOriginalName, fileUrl }: LinkDocumentProps) => {
  return (
    <div className="inline-block border border-gray-300 rounded-full px-4 py-1 text-sm">
      Tututan Pendukung:{" "}
      <a href={fileUrl} className="text-blue-500 hover:underline">
        {fileOriginalName}
      </a>
    </div>
  );
};

export default LinkDocument;
