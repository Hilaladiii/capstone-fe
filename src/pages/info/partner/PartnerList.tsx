import { useState, useEffect } from "react";
import { usePartners } from "../../../common/hooks/usePartner";
import CardPartner from "../../../components/ui/cardPartner";
import Pagination from "../../../components/ui/pagination";
import { PartnerResponse, Partner } from "../../../common/types/partner.type";
import HeaderLayout from "../../../components/layout/HeaderLayout";
import FooterLayout from "../../../components/layout/FooterLayout";
import { FaSearch } from "react-icons/fa";

const PartnerList = () => {
  const [currPage, setCurrPage] = useState(1);
  const [loadedPartners, setLoadedPartners] = useState<Partner[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<string | null>(null);
  const dataPerPage = 1000;
  const displayPerPage = 8;
  const orderBy = "desc";

  const { data, isLoading, isError } = usePartners(1, dataPerPage, orderBy, "", "") as { data?: PartnerResponse; isLoading: boolean; isError: boolean };

  useEffect(() => {
    if (data?.data.partner) {
      setLoadedPartners(data.data.partner);
    }
  }, [data]);

  const handlePageChange = (pageIndex: number) => setCurrPage(pageIndex + 1);
  const handleNext = () => {
    if (currPage < totalPages) setCurrPage(currPage + 1);
  };
  const handlePrevious = () => {
    if (currPage > 1) setCurrPage(currPage - 1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleSortOption = (option: string) => {
    if (sortOption === option) {
      setSortOption(null);
    } else {
      setSortOption(option);
    }
  };

  const filteredData = loadedPartners.filter((partner) => partner.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const sortedData = filteredData.sort((a, b) => {
    if (sortOption === "A-Z") {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === "City") {
      return a.address.localeCompare(b.address);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / displayPerPage);

  const startIndex = (currPage - 1) * displayPerPage;
  const endIndex = startIndex + displayPerPage;
  const currentPartners = sortedData.slice(startIndex, endIndex);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching partners</div>;

  return (
    <main className="flex flex-col">
      <HeaderLayout />
      <img className="mt-8" src="/header-mitra.png" alt="Header" />
      <section className="flex flex-col items-center pt-10 bg-white w-full">
        <div className="flex justify-between items-center w-full px-20">
          <div className="relative w-1/3">
            <input type="text" placeholder="Masukkan kata kunci" value={searchQuery} onChange={handleSearch} className="p-2 pl-10 rounded-full border-2 border-black text-black w-full min-w-210" />
            <FaSearch className="absolute -right-92 top-1/2 transform -translate-y-1/2 text-black" />
          </div>

          <div className="flex justify-end items-end w-1/3 gap-6 h-auto">
            <button onClick={() => toggleSortOption("A-Z")} className={`w-1/2 py-2 rounded-full ${sortOption === "A-Z" ? "bg-primary text-white" : "bg-secondary text-black"}`}>
              Sort A-Z
            </button>
            <button onClick={() => toggleSortOption("City")} className={`w-1/2 py-2 rounded-full ${sortOption === "City" ? "bg-primary text-white" : "bg-secondary text-black"}`}>
              Sort by City
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start m-12">
          <p className="text-xl font-semibold mb-3">Daftar Mitra PKL</p>
          <div className="w-full min-w-330 border-3 border-gray-800 mt-2"></div>
        </div>

        <div className="grid grid-cols-4 justify-center w-full h-124 gap-8 px-30">
          {currentPartners.length === 0 ? (
            <div className="col-span-3 text-lg text-gray-500 text-center py-10">Tidak ada mitra.</div>
          ) : (
            currentPartners.map((partner) => <CardPartner key={partner.partnerId} title={partner.name} address={`Alamat: ${partner.address}`} imageUrl={partner.logoUrl} />)
          )}
        </div>
        <div className="my-14">
          <Pagination
            currentIndex={currPage - 1}
            total={totalPages}
            onPageChange={handlePageChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            primaryColor="text-primary"
            textColor="text-primary"
            borderColor="border-primary"
            hoverBgColor="hover:bg-primary"
            hoverTextColor="hover:text-white"
            activeBgColor="bg-primary"
            activeTextColor="text-white"
          />
        </div>
      </section>
      <FooterLayout />
    </main>
  );
};

export default PartnerList;
