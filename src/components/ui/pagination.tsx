interface PaginationProps {
  currentIndex: number;
  total: number;
  onPageChange: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  primaryColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
}

const Pagination = ({
  currentIndex,
  total,
  onPageChange,
  onNext,
  onPrevious,
  textColor = "text-white",
  borderColor = "border-white",
  hoverBgColor = "hover:bg-white",
  hoverTextColor = "hover:text-primary",
  activeBgColor = "bg-white",
  activeTextColor = "text-primary",
}: PaginationProps) => {
  const createPageNumbers = () => {
    const pages = [];

    if (total <= 4) {
      for (let i = 0; i < total; i++) {
        pages.push(i);
      }
    } else {
      if (currentIndex <= 1) {
        pages.push(0, 1, -1, total - 1);
      } else if (currentIndex >= total - 2) {
        pages.push(0, -1, total - 2, total - 1);
      } else {
        pages.push(0, -1, currentIndex, total - 1);
      }
    }

    return pages;
  };

  const pageNumbers = createPageNumbers();

  return (
    <nav aria-label="Page navigation">
      <ul className="flex items-center h-10 text-base justify-center ">
        <li>
          <button
            onClick={onPrevious}
            className={`flex items-center justify-center px-4 h-10 ${textColor} ${borderColor} border rounded-s-full ${hoverBgColor} ${hoverTextColor}`}
          >
            <svg className="w-3 h-3" viewBox="0 0 6 10" fill="none">
              <path
                d="M5 1 1 5l4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>

        {pageNumbers.map((page, i) => (
          <li key={i}>
            {page === -1 ? (
              <span
                className={`px-4 h-10 flex items-center ${textColor} ${borderColor} border`}
              >
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center px-4 h-10 border ${borderColor} ${hoverBgColor} ${hoverTextColor} ${
                  currentIndex === page
                    ? `${activeTextColor} ${activeBgColor}`
                    : textColor
                }`}
              >
                {page + 1}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={onNext}
            className={`flex items-center justify-center px-4 h-10 ${textColor} ${borderColor} border rounded-e-full ${hoverBgColor} ${hoverTextColor}`}
          >
            <svg className="w-3 h-3" viewBox="0 0 6 10" fill="none">
              <path
                d="m1 9 4-4-4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
