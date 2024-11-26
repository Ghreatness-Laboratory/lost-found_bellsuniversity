import React from 'react';
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
    <div className="flex px-4 md:px-10 my-10">
      <div className="max-w-[900px] w-full">
        <div>
          <div className="flex items-end leading-6 sm:leading-8 gap-5 md:gap-[30px] font-medium text-sm sm:text-base cursor-pointer md:pl-4">
            <p
              className={`sm:py-1 border-b-[2px] hover:text-blue-400 ${activeReportTab === "Reports" ? "text-blue-400 border-b-blue-400 transition ease duration-300ms" : "border-b-white"}`}
              onClick={() => handleReportTabClick("Reports")}
            >
              Reports
            </p>
            <p
              className={`sm:py-1 border-b-[2px] hover:text-blue-400 ${activeReportTab === "My Reports" ? "text-blue-400 border-b-blue-400 transition ease duration-300ms" : "border-b-white"}`}
              onClick={() => handleReportTabClick("My Reports")}
            >
              My Reports
            </p>
          </div>

          <div className="my-4">
            {activeReportTab === 'Reports' ? (
              displayReportForm ? (
                <ReportForm
                  displayReportForm={displayReportForm}
                  setDisplayReportForm={setDisplayReportForm}
                />
              ) : (
                <ReportTab />
              )
            ) : (
              <MyReportsTab />
            )}
          </div>
        </div>

        <div className="fixed z-1 bottom-4 right-4 md:right-10">
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

    </div>
  );
}

export default MakeAReport;
