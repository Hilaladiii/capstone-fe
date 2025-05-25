import { usePartners } from "../../../common/hooks/usePartner";
import CardPartner from "../../../components/ui/cardPartner"; 
import { Button } from "../../../components/ui/button"; 
import { Link } from "react-router-dom";

const PartnerSection = () => {
  const currPage = 1;
  const dataPerPage = 10;
  const orderBy = "desc";

  const { data, isLoading, isError } = usePartners(
    currPage,
    dataPerPage,
    orderBy,
    "", 
    ""  
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching partners</div>;
  }

  return (
    <section className="flex flex-col items-center py-20 bg-white w-full">
      <div className="flex justify-between items-center mb-14 w-full">
        <div className="h-2 bg-gradient-to-l from-black to-white w-150" />
        <h2 className="flex text-2xl font-bold text-secondary whitespace-nowrap">Mitra FILKOM</h2>
        <div className="h-2 bg-gradient-to-r from-black to-white w-150" />
      </div>

      <div className="grid lg:grid-cols-4 w-5xl gap-8">
        {data?.data?.partner.length === 0 ? (
          <div className="col-span-3 text-lg text-gray-500 text-center py-10">Tidak ada mitra.</div>
        ) : (
          data?.data?.partner.slice(0, 8).map((partner) => (
            <CardPartner
              key={partner.partnerId} 
              title={partner.name} 
              address={`Alamat: ${partner.address}`} 
              imageUrl={partner.logoUrl} 
            />
          ))
        )}
      </div>

      <Link to="/info/mitra">
        <Button variant="secondary" className="mt-10 py-3 px-14 cursor-pointer font-semibold text-sm">
          Lihat Semua Mitra <span className="ml-2 text-sm font-semibold">→</span>
        </Button>
      </Link>
    </section>
  );
};

export default PartnerSection;