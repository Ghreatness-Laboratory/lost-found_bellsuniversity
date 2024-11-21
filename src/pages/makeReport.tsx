import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import ReportForm from "../components/makeReport/form";
import MyReportsTab from "../components/makeReport/myReportsTab";
import ReportTab from "../components/makeReport/reportTab";

type TabType = "Reports" | "My Reports";

function MakeAReport() {
  const [activeReportTab, setActiveReportTab] = useState<TabType>("Reports");
  const [displayReportForm, setDisplayReportForm] = useState(false)

  const handleReportTabClick = (tab: TabType) => {
    setActiveReportTab(tab);
  };

  const handleReportForm = () => {
    setDisplayReportForm(!displayReportForm)
  }

  return (
    <div className="flex px-10 mb-10">
      <div className="max-w-[900px] w-full">
        <div>
          <div className="pl-4 md:pl-8">
            <span className='flex items-end leading-8 gap-[30px] font-medium text-xs sm:text-base cursor-pointer'>
              <p
                className={`sm:py-1 border-b-[2px] border-b-white hover:text-blue-400 ${activeReportTab === "Reports" ? "text-blue-400 border-b-blue-400 transition ease duration-300ms" : ""}`}
                onClick={() => handleReportTabClick("Reports")}
              >
                Reports
              </p>
              <p
                className={`sm:py-1 border-b-[2px] border-b-white hover:text-blue-400 ${activeReportTab === "My Reports" ? "text-blue-400 border-b-blue-400 transition ease duration-300ms" : ""}`}
                onClick={() => handleReportTabClick("My Reports")}
              >
                My Reports
              </p>
            </span>
          </div>

          <div className="my-4">
            {activeReportTab === 'Reports' ? (
              displayReportForm ? (
                <ReportForm />
              ) : (
                <ReportTab />
              )
            ) : (
              <MyReportsTab />
            )}
          </div>
        </div>

        <div className="fixed z-1 bottom-4 right-10">
          <span className="sr-only">Make a report button</span>
          <div
            onClick={handleReportForm}
            className="bg-blue-400 p-4 rounded-full w-fit cursor-pointer">
            {displayReportForm ? (
              <FaTimes className="w-6 h-6 text-white" />
            ) : (
              <FaPlus className="w-6 h-6 text-white" />
            )}
          </div>
        </div>
      </div>

      <div>

      </div>
    </div>
  );
}

export default MakeAReport;
