import ReportHistory from "./reportHistory";
import { reports } from "./reportTab";

const MyReportsTab = () => {
  return (
    <div className="flex flex-col gap-6 md:p-3">
      {reports.map((report, index) => (
        <div key={index}>
          <ReportHistory
            name={report.name}
            location={report.location}
            date={report.date}
            image={report.image}
          />
        </div>
      ))}
    </div>
  )
}

export default MyReportsTab;