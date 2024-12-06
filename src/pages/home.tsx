import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/images/9886321 2.png";
import BLFStep3 from "../assets/images/man_10428848 1.svg";
import BLFStep2 from "../assets/images/report.svg";
import BLFStep1 from "../assets/images/scan_7026205 1.svg";
import Filter from "../components/common/filter";
import ReportList from "../components/common/reportList";
import useFetch from "../hooks/useFetch";

interface UniversityProps {
  uni: string;
}

const Home: React.FC = () => {
  const [, setCurrentUni] = useState<string>("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const { data: universities } = useFetch<UniversityProps[]>("/data/universities.json");

  useEffect(() => {
    const fetchUserData = async () => {
      const userUniversity = "Bells University";
      const university = universities?.find((uni) => uni.uni.toLowerCase() === userUniversity.toLowerCase());
      setCurrentUni(university?.uni || "");
    };

    fetchUserData();
  }, [universities]);

  const handleFilterChange = (selectedLocation: string) => {
    setSelectedLocations((prev) =>
      prev.includes(selectedLocation)
        ? prev.filter((location) => location !== selectedLocation)
        : [...prev, selectedLocation]
    );
  };

  return (
    <div>
      <section className="flex flex-col md:flex-row gap-10 md:justify-between max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-10 pt-5">
        <header className="flex flex-col justify-center gap-5 md:max-w-[650px] w-full text-center md:text-left">
          <h1 role="heading" className="text-3xl sm:text-4xl md:text-5xl leading-10 md:leading-[50px] lg:leading-[60px] font-bold">
            Welcome to <span className="capitalize">Bells University</span> Lost and Found
          </h1>
          <p className="text-lg lg:text-2xl leading-20 font-normal">
            At <span className="capitalize">Bells University</span> Lost and Found, we can help you find items lost on campus.
          </p>
          <div className="max-w-[500px] w-full mx-auto md:mx-0 mt-5 md:mt-10">
            <h3 className=" bg-blue-400 text-white text-lg md:text-xl py-2 font-semibold text-center rounded-full">
              Use misplaceme in 3 simple steps
            </h3>
            <div className="flex flex-col gap-3 text-xl font-semibold py-4">
              <p className="flex gap-4 max-w-[250px] w-full mx-auto md:mx-0 text-lg md:text-xl">
                <img src={BLFStep1} className="w-[30px] h-[30px]" />
                Find an item?
              </p>
              <p className="flex gap-4 max-w-[250px] w-full mx-auto md:mx-0 text-lg md:text-xl">
                <img src={BLFStep2} className="w-[30px] h-[30px]" />
                Report item
              </p>
              <p className="flex gap-4 max-w-[250px] w-full mx-auto md:mx-0 text-lg md:text-xl">
                <img src={BLFStep3} className="w-[30px] h-[30px]" />
                Return to it&apos;s owner
              </p>
            </div>
          </div>
        </header>

        <div className="hidden md:block md:max-w-[500px] w-full h-[550px]">
          <img
            src={backgroundImage}
            className="md:rounded-[20px] h-full w-full"
          />
        </div>
      </section>

      <ReportList
        title="Search our database for your lost properties"
        filter={<Filter onFilterChange={handleFilterChange} />}
        selectedLocations={selectedLocations}
      />
    </div>
  );
};

export default Home;
