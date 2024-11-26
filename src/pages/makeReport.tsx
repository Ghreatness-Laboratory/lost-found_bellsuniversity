import React, { useState } from "react";
import ReportForm from "../components/makeReport/form";
import LostImage from '../assets/images/male-hand-holding-glasses-isolated 1.png'
import ReportPreview from "../components/makeReport/reportPreview";
import { FaEdit } from "react-icons/fa";

function MakeAReport() {
  const [displayReportPreview, setDisplayReportPreview] = useState(false);
  const date = { day: 23, month: 8, year: 24 }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <section className="relative flex flex-col lg:flex-row gap-10 w-full">
        <div className="flex-grow max-w-3xl w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
            Fill the Form to Make a Report
          </h1>
          <ReportForm
            displayReportPreview={displayReportPreview}
            setDisplayReportPreview={setDisplayReportPreview}
          />
        </div>

        {displayReportPreview ? (
          <ReportPreview
            name='Found Iphone At Football Field'
            image={LostImage}
            description=" A wristwatch was found in the classroom during the afternoon session. If you believe this item belongs to you, please contact the lost and found office."
            date={date}
            location='Classroom'
          />
        ) : (
          <div className='lg:absolute lg:right-0 lg:top-20 lg:w-96 w-full'>
            <div className="bg-white grid place-items-center border border-gray-200 rounded-xl shadow-lg overflow-hidden h-40 lg:h-80 text-center text-base lg:text-xl">
              <div className="flex flex-col gap-2 items-center">
                <FaEdit size={50} />
                Report lost and found items
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default MakeAReport;