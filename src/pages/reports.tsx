import React from "react";
import ReportsHistory from "../components/reports/reportHistory";

const Reports: React.FC = () => {
  return (
    <div data-testid="reports-page" className="px-4 md:px-10 my-10">
      <ReportsHistory />
    </div>
  );
};

export default Reports;