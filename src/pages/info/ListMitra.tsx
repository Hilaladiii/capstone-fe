import { useEffect, useState } from "react";
import apiService, { Partner } from "../../services/partner.service";
import { useAuth } from "../../common/hooks/useAuth";
import HeaderLayout from "../../components/layout/HeaderLayout";
import { FaSearch } from "react-icons/fa";
import FooterLayout from "../../components/layout/FooterLayout";
import CardMitra from "../../components/ui/cardMitra";

const ListMitra = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const { token } = useAuth();

  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(6); 

  const fetchPartners = async () => {
    if (token) {
      const response = await apiService.getPartners(currentPage, itemsPerPage, "", "", token);
      setPartners(response.data.partner);
    } else {
      setPartners([]);
    }
  };

  useEffect(() => {
    fetchPartners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, currentPage]); 

  const [sortOption, setSortOption] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = partners.filter((partner) => partner.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const sortedData = filteredData.sort((a, b) => {
    if (sortOption === "A-Z") {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === "City") {
      return a.address.localeCompare(b.address);
    }
    return 0;
  });

  const toggleSortOption = (option: string) => {
    if (sortOption === option) {
      setSortOption(null);
    } else {
      setSortOption(option);
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(partners.length / itemsPerPage); // Menghitung total halaman

  return (
    <main className="flex flex-col">
      <HeaderLayout />
      <img className="mt-8" src="/header-mitra.png" alt="Header" />
      <div className="bg-white text-black pt-10 py-16 px-10 w-full">
        <div className="flex justify-between w-full gap-4">
          <div className="flex items-center justify-between w-5/6 ml-30 mb-8">
            <div className="relative w-1/3">
              <input type="text" placeholder="Masukkan kata kunci" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="p-4 pl-10 rounded-full border-2 border-black text-black w-full" />
              <FaSearch className="absolute right-8 top-1/2 transform -translate-y-1/2 text-black" />
            </div>

            <div className="flex justify-end items-end w-1/3 gap-6 h-auto">
              <button onClick={() => toggleSortOption("A-Z")} className={`w-1/2 py-2 rounded-xl ${sortOption === "A-Z" ? "bg-primary text-white" : "bg-secondary text-black"}`}>
                Sort A-Z
              </button>
              <button onClick={() => toggleSortOption("City")} className={`w-1/2 py-2 rounded-xl ${sortOption === "City" ? "bg-primary text-white" : "bg-secondary text-black"}`}>
                Sort by City
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 justify-center items-center w-full gap-8 px-30">
          {partners.length === 0 ? (
            <div className="col-span-3 text-md text-gray-500 text-center py-10">Tidak ada mitra.</div>
          ) : (
            sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((partner) => <CardMitra key={partner.partnerId} title={partner.name} address={`Alamat: ${partner.address}`} imageUrl={partner.logoUrl} />)
          )}
        </div>

        <nav aria-label="Page navigation example">
          <ul className="flex items-center justify-center -space-x-px h-8 mt-10 text-sm">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-support1 border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                </svg>
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === index + 1 ? "bg-blue-100 text-blue-600" : ""}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 rounded-e-lg leading-tight text-gray-500 bg-support1 border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <FooterLayout />
    </main>
  );
};

export default ListMitra;
