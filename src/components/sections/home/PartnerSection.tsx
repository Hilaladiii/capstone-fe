import { useEffect, useState } from "react";
import apiService, { Partner } from "../../../services/partner.service";
import { useAuth } from "../../../common/hooks/useAuth";
import Card from "../../ui/cardMitra";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";

const PartnerSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const { token } = useAuth();

  const fetchPartners = async () => {
    if (token) {
      const response = await apiService.getPartners(1, 10, "", "", token);
      setPartners(response.data.partner);
    } else {
      setPartners([]);
    }
  };

  useEffect(() => {
    fetchPartners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <section className="flex flex-col items-center py-20 bg-white w-full">
      <div className="flex justify-between items-center mb-14 w-full">
        <div className="h-2 bg-gradient-to-l from-black to-white w-150" />
        <h2 className="flex text-3xl font-bold text-secondary whitespace-nowrap">Mitra FILKOM</h2>
        <div className="h-2 bg-gradient-to-r from-black to-white w-150" />
      </div>

      <div className="grid lg:grid-cols-3 w-5xl gap-8">
        {partners.length === 0 ? (
          <div className="col-span-3 text-md text-gray-500 text-center py-10">Tidak ada mitra.</div>
        ) : (
          partners.map((partner) => <Card key={partner.partnerId} title={partner.name} address={`Alamat: ${partner.address}`} imageUrl={partner.logoUrl} />)
        )}
      </div>
      <Link to="/info/mitra">
        <Button variant="secondary" className="mt-10 py-3 px-8 cursor-pointer">
          Lihat Semua Mitra <span className="ml-2 text-md font-semibold">→</span>
        </Button>
      </Link>
    </section>
  );
};

export default PartnerSection;
