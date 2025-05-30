import { Button } from "../../../../components/ui/button";

const links = [
  {
    label: "Buku Panduan Penyelesaian dan Evaluasi PKL 2018",
    href: "/panduan-pkl.pdf",
    isExternal: true,
  },
  {
    label: "Template Dokumen dan Formulir PKL",
    href: "https://drive.google.com/drive/folders/1mhpRmu-QeU8rJdCXhvDPWRz9DMQCs8UV",
    isExternal: true,
  },
  {
    label: "Mitra PKL FILKOM UB",
    href: "/info/mitra",
    isExternal: false,
  },
];

const TemplateLinks = () => {
  return (
    <div className="text-black rounded-[20px] w-full max-w-149">
      <div className="text-xl font-bold texy-start mb-8">Link Terkait Pengajuan PKL</div>
      <div className="flex flex-col space-y-4">
        {links.map(({ label, href, isExternal }) => (
          <div
            key={label}
            className="flex justify-between items-center bg-white rounded-full border-3 border-black pl-4 h-12"
          >
            <span className="text-black font-semibold text-sm">{label}</span>
            <Button
              className="text-white border-3 border-r-0 border-black py-2 px-12 bg-secondary rounded-full h-12"
              onClick={() =>
                isExternal ? window.open(href, "_blank") : (window.location.href = href)
              }
            >
              Lihat
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateLinks;
