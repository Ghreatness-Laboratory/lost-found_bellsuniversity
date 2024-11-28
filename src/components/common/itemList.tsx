import React, { useState } from "react";
import LostItemImage2 from '../../assets/images/male-hand-holding-glasses-isolated 1.png';
import Item from "./item";

interface ItemListProps {
  title?: string,
  filter?: React.ReactNode,
  reportItems?: number,
  selectedLocations?: string[],
}

const items = [
  {
    name: 'Found wristwatch At Classroom',
    date: { day: 13, month: 11, year: 24 },
    image: LostItemImage2,
    location: "Classroom",
  },
  {
    name: 'Found Iphone At Football Field',
    date: { day: 23, month: 8, year: 24 },
    image: LostItemImage2,
    location: "Football field/Pavilion",
  },
  {
    name: 'Found wristwatch At Classroom',
    date: { day: 12, month: 9, year: 24 },
    image: LostItemImage2,
    location: "Classroom",
  },
  {
    name: 'Found Iphone At Football Field',
    date: { day: 3, month: 4, year: 24 },
    image: LostItemImage2,
    location: "Football field/Pavilion",
  },
  {
    name: 'Found wristwatch At Classroom',
    date: { day: 18, month: 1, year: 24 },
    image: LostItemImage2,
    location: "Classroom",
  },
  {
    name: 'Found Iphone At Football Field',
    date: { day: 17, month: 11, year: 24 },
    image: LostItemImage2,
    location: "Football field/Pavilion",
  },
];

const ItemList = ({ title, filter, reportItems, selectedLocations = [] }: ItemListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = reportItems ?? 3;

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      selectedLocations.length === 0 || selectedLocations.includes(item.location);
    return matchesSearch && matchesLocation;
  });

  // const filteredItems = items.filter((item) => {
  //   const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesLocation =
  //     selectedLocations.includes("All")
  //       ? true
  //       : selectedLocations.length === 0 || selectedLocations.includes(item.location);
  //   return matchesSearch && matchesLocation;
  // });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className="my-10 md:my-20 mx-4 md:mx-10 px-0 md:px-10">
      <div className="flex flex-col gap-4 md:gap-6 items-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-center">{title}</h1>
        <div className="flex item-center justify-center gap-1.5 md:gap-3 w-full">
          <div className="relative max-w-[700px] w-full">
            <span className="sr-only">Search Bar</span>
            <div className="absolute top-1/2 left-5 -translate-y-1/2">
              <span className="sr-only">Search Icon</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 50 45" fill="none">
                <path d="M35.7347 28.3019H33.4763L32.6758 27.6072C35.5745 24.5817 37.1675 20.7188 37.1641 16.7238C37.1641 13.4162 36.0743 10.1828 34.0325 7.43258C31.9906 4.68236 29.0885 2.53882 25.6931 1.27303C22.2977 0.00724618 18.5614 -0.323942 14.9569 0.321351C11.3523 0.966645 8.04131 2.55944 5.44256 4.89831C2.84382 7.23718 1.07405 10.2171 0.357057 13.4612C-0.359935 16.7053 0.00805131 20.0679 1.41448 23.1238C2.82091 26.1797 5.20262 28.7916 8.25842 30.6292C11.3142 32.4669 14.9069 33.4477 18.5821 33.4477C23.1847 33.4477 27.4157 31.9297 30.6747 29.4082L31.4465 30.1286V32.1612L45.7404 45L50 41.1664L35.7347 28.3019ZM18.5821 28.3019C11.4637 28.3019 5.71756 23.1304 5.71756 16.7238C5.71756 10.3173 11.4637 5.1458 18.5821 5.1458C25.7004 5.1458 31.4465 10.3173 31.4465 16.7238C31.4465 23.1304 25.7004 28.3019 18.5821 28.3019Z" fill="white" />
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
          {filter && React.cloneElement(filter as React.ReactElement, {
            onChange: () => { },
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-0 md:px-10 pt-8 md:pt-12">
        {paginatedItems.map((item, index) => (
          <div key={index}>
            <Item
              name={item.name}
              date={item.date}
              style='flex flex-col gap-2 md:gap-5'
              imageStyle="rounded-lg "
              image={item.image}
            />
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && <div className="grid place-items-center min-h-[50vh] px-4">
        <div className="flex flex-col items-center gap-4 p-6">

          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">No Results Found</h1>
          <p className="text-center text-gray-600 max-w-md">
            We couldn&apos;t find anything matching your search or filters. Please try again.
          </p>
        </div>
      </div>}

      {filteredItems.length > 0 && <div className="flex items-center justify-center gap-4 mt-4 max-w-[320px] w-full mx-auto mt-8 text-sm md:text-base">
        <button
          className="py-2 bg-blue-400 text-white rounded-full max-w-[90px] w-full active:bg-blue-500"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          {currentPage} of {totalPages}
        </span>
        <button
          className="py-2 bg-blue-400 text-white rounded-full max-w-[90px] w-full active:bg-blue-500"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>}
    </section>
  );
};

export default ItemList;