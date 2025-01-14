import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { ReportProps } from "../../types/report.types";
import Loader from "./loader";
import ReportItem from "./reportItem";

interface ReportListProps {
  filter?: React.ReactNode;
  selectedLocations?: string[];
}

const ReportList = ({ filter, selectedLocations = [] }: ReportListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { data: items, loading, error } = useFetch<ReportProps[]>("/reports/");

  const filteredItems = (items ?? []).filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(item.location);
    return matchesSearch && matchesLocation;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] my-10 max-w-[1280px] mx-4 sm:mx-8 xl:mx-auto px-4 sm:px-8 lg:px-10 bg-red-50/10 text-red-500 rounded-lg shadow-sm text-center">
        <h1 className="text-3xl font-bold">Oops!</h1>
        <p className="text-lg mt-2">
          Something went wrong while fetching the reports.
        </p>
        <p className="text-base mt-1">
          Error {error.status}: {error.message}
        </p>
        <button
          className="mt-4 py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <section className="my-10 md:my-20 mx-4 lg:mx-10 px-0 lg:px-10">
      <div className="flex flex-col gap-4 md:gap-6 items-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-left md:text-center">
          Search our database for your lost properties
        </h1>
        <div className="flex item-center justify-center gap-1.5 md:gap-3 w-full">
          <div className="relative max-w-[700px] w-full">
            <span className="sr-only">Search Bar</span>
            <div className="absolute top-1/2 left-5 -translate-y-1/2">
              <span className="sr-only">Search Icon</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 50 45"
                fill="none"
              >
                <path
                  d="M35.7347 28.3019H33.4763L32.6758 27.6072C35.5745 24.5817 37.1675 20.7188 37.1641 16.7238C37.1641 13.4162 36.0743 10.1828 34.0325 7.43258C31.9906 4.68236 29.0885 2.53882 25.6931 1.27303C22.2977 0.00724618 18.5614 -0.323942 14.9569 0.321351C11.3523 0.966645 8.04131 2.55944 5.44256 4.89831C2.84382 7.23718 1.07405 10.2171 0.357057 13.4612C-0.359935 16.7053 0.00805131 20.0679 1.41448 23.1238C2.82091 26.1797 5.20262 28.7916 8.25842 30.6292C11.3142 32.4669 14.9069 33.4477 18.5821 33.4477C23.1847 33.4477 27.4157 31.9297 30.6747 29.4082L31.4465 30.1286V32.1612L45.7404 45L50 41.1664L35.7347 28.3019ZM18.5821 28.3019C11.4637 28.3019 5.71756 23.1304 5.71756 16.7238C5.71756 10.3173 11.4637 5.1458 18.5821 5.1458C25.7004 5.1458 31.4465 10.3173 31.4465 16.7238C31.4465 23.1304 25.7004 28.3019 18.5821 28.3019Z"
                  fill="white"
                />
              </svg>
            </div>
            <input
              className="bg-[#222630] w-full pl-12 py-3 outline-none text-white rounded-xl border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              type="text"
            />
          </div>
          {filter &&
            React.cloneElement(filter as React.ReactElement, {
              onChange: () => {},
            })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-0 lg:px-10 pt-8 md:pt-12">
        {paginatedItems.map((item, index) => (
          <div key={index}>
            <ReportItem
              title={item.title}
              date_reported={item.date_reported}
              style="flex flex-col gap-2 md:gap-5"
              imageStyle="rounded-lg "
              image={item.image}
              location={item.location}
            />
          </div>
        ))}
      </div>

      {filteredItems.length > 0 && (
        <div className="flex items-center justify-center gap-4 max-w-[600px] mx-auto mt-8 text-sm md:text-base">
          <button
            className={`py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition ${
              currentPage === 1 && "cursor-not-allowed opacity-50"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition ${
              currentPage === totalPages && "cursor-not-allowed opacity-50"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default ReportList;
