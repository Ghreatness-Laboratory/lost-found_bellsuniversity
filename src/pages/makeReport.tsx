import React, { useState } from "react";
import LostImage from '../assets/images/male-hand-holding-glasses-isolated 1.png';
import ReportForm from "../components/make-a-report/reportForm";
import ReportPreview from "../components/make-a-report/reportPreview";
import { FormData } from "../types/reportForm.types";

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
    <div data-testid="make-a-report-page" className="container mx-auto px-4 md:px-6 py-10">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">
          Fill the Form to Make a Report
        </h1>
        <ReportForm
          displayReportPreview={displayReportPreview}
          setDisplayReportPreview={setDisplayReportPreview}
          setFormData={setFormData}
        />

        {formData && (
          <ReportPreview
            isOpen={displayReportPreview}
            title={formData.title}
            image={typeof formData.image === 'string' ? formData.image : LostImage}
            description={formData.description}
            date_reported={formData.date_reported}
            location={formData.location}
            onReportSubmit={handleReportSubmit}
            onCancel={resetForm}
          />
        )}
      </section>
    </div>
  );
}

export default MakeAReport;