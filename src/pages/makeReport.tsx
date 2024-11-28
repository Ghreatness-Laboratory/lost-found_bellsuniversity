import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import LostImage from '../assets/images/male-hand-holding-glasses-isolated 1.png';
import ReportForm from "../components/makeReport/form";
import ReportPreview from "../components/makeReport/reportPreview";

interface FormData {
  title: string;
  description: string;
  image: string | null;
  location: string;
  reportType: string;
  date: string;
  phoneNumber: string;
  email: string;
}

const MakeAReport: React.FC = () => {
  const [displayReportPreview, setDisplayReportPreview] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const resetForm = () => {
    setDisplayReportPreview(false);
    setFormData(null);
  };

  const handleReportSubmit = () => {
    if (formData) {
      resetForm();
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <section className="relative flex flex-col lg:flex-row gap-10 w-full">
        <div className="flex-grow max-w-3xl w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">
            Fill the Form to Make a Report
          </h1>
          <ReportForm
            displayReportPreview={displayReportPreview}
            setDisplayReportPreview={setDisplayReportPreview}
            setFormData={setFormData}
          />
        </div>

        {displayReportPreview && formData ? (
          <ReportPreview
            name={formData.title}
            image={formData.image || LostImage}
            description={formData.description}
            date={{
              day: new Date(formData.date).getDate(),
              month: new Date(formData.date).getMonth() + 1,
              year: new Date(formData.date).getFullYear()
            }}
            location={formData.location}
            onReportSubmit={handleReportSubmit}
            onCancel={resetForm}
          />
        ) : (
          <div className='xl:absolute xl:right-0 xl:top-20 lg:w-96 w-full'>
            <div className="bg-white border border-dashed border-blue-300 rounded-xl shadow-lg p-6 h-80 flex flex-col justify-center items-center text-center transition-all duration-300 hover:border-blue-500 hover:shadow-xl">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-blue-50 p-4 rounded-full mb-2">
                  <FaPlus className="text-blue-500 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Create a Lost or Found Report
                </h3>
                <p className="text-sm text-gray-500 max-w-xs mb-4">
                  Help reunite lost items with their owners. Share details about an item you&apos;ve lost or found.
                </p>
                <div className="text-xs text-gray-400 italic">
                  Start by filling out the form
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default MakeAReport;