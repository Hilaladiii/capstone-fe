import { Button } from "../../../components/ui/button";

const TemplateDokument = () => {
  return (
    <section className="w-full bg-primary text-white py-16 px-10">
      <div className="text-3xl font-semibold text-center mb-10">Link Terkait Pengajuan PKL</div>
      <div className="flex flex-col space-y-6 w-full px-40">
        <div className="flex justify-between items-center bg-white rounded-lg w-full border-3 border-secondary">
          <span className="text-black text-base px-4 font-semibold">Buku Panduan Penyelesaian dan Evaluasi PKL 2018</span>
          <Button 
            className="bg-white text-secondary border-3 border-l-4 border-secondary py-3 px-4 rounded-md w-1/6 h-full m-0"
            onClick={() => window.open('/panduan-pkl.pdf', '_blank')} 
          >
            Lihat
          </Button>
        </div>

        <div className="flex justify-between items-center bg-white rounded-lg w-full border-3 border-secondary">
          <span className="text-black text-base px-4 font-semibold">Template Dokumen dan Formulir PKL</span>
          <Button 
            className="bg-white text-secondary border-3 border-l-4 border-secondary py-3 px-4 rounded-md w-1/6 h-full m-0"
            onClick={() => window.open('https://drive.google.com/drive/folders/1mhpRmu-QeU8rJdCXhvDPWRz9DMQCs8UV', '_blank')} 
          >
            Lihat
          </Button>
        </div>

        <div className="flex justify-between items-center bg-white rounded-lg w-full border-3 border-secondary">
          <span className="text-black text-base px-4 font-semibold">Mitra PKL FILKOM UB</span>
          <Button 
            className="bg-white text-secondary border-3 border-l-4 border-secondary py-3 px-4 rounded-md w-1/6 h-full m-0"
            onClick={() => window.location.href = '/info/mitra'}
          >
            Lihat
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplateDokument;
