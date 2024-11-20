import { useEffect, useState } from 'react';
import LostItem from '../components/item';
import backgroundImage from '../assets/images/9886321 2.png';
import LostItemImage2 from '../assets/images/male-hand-holding-glasses-isolated 1.png';
import BLFStep3 from '../assets/images/man_10428848 1.svg';
import BLFStep2 from '../assets/images/report.svg';
import BLFStep1 from '../assets/images/scan_7026205 1.svg';

const items = [
  {
    name: 'Found wristwatch At Classroom',
    date: {
      day: 13,
      month: 11,
      year: 24
    },
    image: LostItemImage2
  },
  {
    name: 'Found Iphone At Football Field',
    date: {
      day: 23,
      month: 8,
      year: 24
    },
    image: LostItemImage2
  },
  {
    name: 'Found wristwatch At Classroom',
    date: {
      day: 12,
      month: 9,
      year: 24
    },
    image: LostItemImage2
  },
  {
    name: 'Found Iphone At Football Field',
    date: {
      day: 3,
      month: 4,
      year: 24
    },
    image: LostItemImage2
  },
  {
    name: 'Found wristwatch At Classroom',
    date: {
      day: 18,
      month: 1,
      year: 24
    },
    image: LostItemImage2
  },
  {
    name: 'Found Iphone At Football Field',
    date: {
      day: 17,
      month: 11,
      year: 24
    },
    image: LostItemImage2
  },
]

const universities = [
  {
    uni: 'Bells University',
    abbr: 'BLF',
  },
  {
    uni: 'Babcock University',
    abbr: 'BUF',
  },
];

function Home() {
  const [currentUni, setCurrentUni] = useState<string>('');
  const [currentAbbr, setCurrentAbbr] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchUserData = async () => {
      const userUniversity = 'Bells University';
      const university = universities.find((uni) => uni.uni === userUniversity);
      setCurrentUni(university?.uni || '');
      setCurrentAbbr(university?.abbr || '');
    };

    fetchUserData();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div>
      <section className="flex flex-col md:flex-row gap-4 md:justify-between max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-10 pt-5">
        <header className="flex flex-col justify-center gap-5 md:max-w-[650px] w-full text-center md:text-left">
          <p className="text-3xl sm:text-4xl md:text-5xl leading-10 md:leading-[50px] lg:leading-[60px] font-bold">
            Welcome to {currentUni} Lost and Found
          </p>
          <p className="text-xl lg:text-2xl leading-20 font-normal">
            At {currentUni} Lost and Found, we can help you find items lost on campus.
          </p>
          <div className="max-w-[500px] w-full mx-auto md:mx-0 mt-5 md:mt-10">
            <h3 className=" bg-blue-400 text-white py-2 text-xl font-semibold text-center rounded-full">
              Use {currentAbbr} in 3 simple steps
            </h3>
            <div className="flex flex-col gap-3 text-xl font-semibold py-4">
              <p className="flex gap-4 max-w-[250px] w-full mx-auto md:mx-0">
                <img
                  src={BLFStep1}
                  className="w-[30px h-[30px]"
                />
                Find an item?
              </p>
              <p className="flex gap-4 max-w-[250px] w-full mx-auto md:mx-0">
                <img
                  src={BLFStep2}
                  className="w-[30px h-[30px]"
                />
                Report on {currentAbbr}
              </p>
              <p className="flex gap-4 max-w-[250px] w-full mx-auto md:mx-0">
                <img
                  src={BLFStep3}
                  className="w-[30px h-[30px]"
                />
                Return to its owner
              </p>
            </div>
          </div>
        </header>

        <div className="hidden md:block md:max-w-[500px] w-full">
          <img
            src={backgroundImage}
            className="rounded-0 md:rounded-[20px] h-full"
          />
        </div>
      </section>

      <section className='my-10 md:my-20 mx-4 md:mx-10 px-0 md:px-10 '>
        <div className='flex flex-col gap-4 md:gap-6 items-center'>
          <h1 className='text-2xl sm:text-4xl md:text-5xl font-semibold text-center '>Check out the latest reports</h1>
          <div className='relative max-w-[700px] w-full'>
            <span className='sr-only'>Search Bar</span>
            <div className='absolute top-1/2 left-5 -translate-y-1/2 '>
              <span className='sr-only'>Search Icon</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 50 45" fill="none">
                <path d="M35.7347 28.3019H33.4763L32.6758 27.6072C35.5745 24.5817 37.1675 20.7188 37.1641 16.7238C37.1641 13.4162 36.0743 10.1828 34.0325 7.43258C31.9906 4.68236 29.0885 2.53882 25.6931 1.27303C22.2977 0.00724618 18.5614 -0.323942 14.9569 0.321351C11.3523 0.966645 8.04131 2.55944 5.44256 4.89831C2.84382 7.23718 1.07405 10.2171 0.357057 13.4612C-0.359935 16.7053 0.00805131 20.0679 1.41448 23.1238C2.82091 26.1797 5.20262 28.7916 8.25842 30.6292C11.3142 32.4669 14.9069 33.4477 18.5821 33.4477C23.1847 33.4477 27.4157 31.9297 30.6747 29.4082L31.4465 30.1286V32.1612L45.7404 45L50 41.1664L35.7347 28.3019ZM18.5821 28.3019C11.4637 28.3019 5.71756 23.1304 5.71756 16.7238C5.71756 10.3173 11.4637 5.1458 18.5821 5.1458C25.7004 5.1458 31.4465 10.3173 31.4465 16.7238C31.4465 23.1304 25.7004 28.3019 18.5821 28.3019Z" fill="white" />
              </svg>
            </div>
            <input
              className="bg-[#222630] w-full pl-12 py-3 outline-none text-white rounded-full border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-0 md:px-10 pt-8 md:pt-12'>
          {paginatedItems.map((item, index) => (
            <div key={index}>
              <LostItem
                name={item.name}
                date={item.date}
                image={item.image}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-4 max-w-[320px] w-full mx-auto">
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
        </div>
      </section>
    </div>
  );
}

export default Home;
