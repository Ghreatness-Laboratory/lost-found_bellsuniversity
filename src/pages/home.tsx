import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/images/9886321 2.png";
import BLFStep3 from "../assets/images/man_10428848 1.svg";
import BLFStep2 from "../assets/images/report.svg";
import BLFStep1 from "../assets/images/scan_7026205 1.svg";
import Filter from "../components/common/filter";
import ReportList from "../components/common/reportList";

interface UniversityProps {
  uni: string;
}

const universities: UniversityProps[] = [
  {
    uni: "Bells University",
  },
];

const steps = [
  {
    icon: BLFStep1,
    text: "Find an item?",
    description: "Spot a lost item somewhere in your vicinity",
  },
  {
    icon: BLFStep2,
    text: "Report item",
    description: "Take a photo and describe where you found it",
  },
  {
    icon: BLFStep3,
    text: "Return to its owner",
    description: "Help reunite the item with its rightful owner",
  },
];

const Home: React.FC = () => {
  const [currentUni, setCurrentUni] = useState<string>("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userUniversity = "Bells University";
      const university = universities?.find(
        (uni) => uni.uni.toLowerCase() === userUniversity.toLowerCase()
      );
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
    <div data-testid="home-page">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-300/5 to-white pt-16 pb-8">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row gap-10 md:justify-between items-center">
            <header className="flex flex-col justify-center gap-5 md:max-w-[650px] w-full text-left">
              <h1
                role="heading"
                className="text-4xl md:text-5xl leading-tight font-bold text-gray-800"
              >
                Welcome to{" "}
                <span className="capitalize text-blue-600">{currentUni}</span>{" "}
                Lost and Found
              </h1>
              <p className="text-lg lg:text-2xl leading-relaxed text-gray-600">
                At <span className="capitalize">{currentUni}</span> Lost and
                Found, we can help you find items lost on campus.
              </p>

              <div className="bg-transparent md:bg-white rounded-2xl md:border-2 pt-4 px-0 md:py-5 md:px-10 mt-5 md:mt-20">
                <h3 className="bg-blue-400 text-white text-lg md:text-xl p-2 md:px-6 font-semibold text-center rounded-full transform -translate-y-3 md:-translate-y-10 mx-auto max-w-[500px]">
                  Use misplaceme in 3 simple steps
                </h3>
                <div className="flex flex-col gap-1 md:gap-3">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 md:gap-6 py-1 rounded-xl"
                    >
                      <div className="bg-white shadow-mdrounded-2xl max-md:pt-1">
                        <img
                          src={step.icon}
                          className="w-6 h-6 object-contain"
                          alt={step.text}
                        />{" "}
                      </div>
                      <div className="md:space-y-1">
                        <p className="text-xl font-semibold text-gray-800">
                          {step.text}
                        </p>
                        <p className="text-gray-600 text-xs">
                          {step.description}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className="hidden md:block absolute h-12 w-px bg-blue-200 ml-8"
                          style={{ top: `${(index + 1) * 120}px` }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </header>

            <div className="hidden md:block md:max-w-[500px] w-full">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/10 rounded-[20px]" />
                <img
                  src={backgroundImage}
                  className="md:rounded-[20px] h-[550px] w-full object-cover"
                  alt="Lost and Found"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReportList
        filter={<Filter onFilterChange={handleFilterChange} />}
        selectedLocations={selectedLocations}
      />
    </div>
  );
};

export default Home;
