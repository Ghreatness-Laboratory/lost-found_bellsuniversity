import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { reports } from "./reportTab";

interface Report {
  id: number;
  name: string,
  date: {
    day: number,
    month: number,
    year: number
  },
  image: string,
  status: string,
  location: string,
}

interface EditableReport extends Report {
  isEditing: boolean;
}

const ReportsHistory: React.FC = () => {
  const [reportList, setReportList] = useState<EditableReport[]>(
    reports.map(report => ({
      ...report,
      id: report.id ?? 0,
      isEditing: false
    }))
  );

  const handleDelete = (idToDelete: number) => {
    setReportList(currentReports =>
      currentReports.filter(report => report.id !== idToDelete)
    );
  };

  const handleEditToggle = (idToToggle: number) => {
    setReportList(currentReports =>
      currentReports.map(report => report.id === idToToggle ? { ...report, isEditing: !report.isEditing } : report)
    );
  };

  const handleUpdateReport = (idToUpdate: number, field: keyof Report, value: string | { day: number, month: number, year: number }) => {
    setReportList(currentReports => currentReports.map(report => report.id === idToUpdate ? { ...report, [field]: value } : report)
    );
  };

  return (
    <section className="sm:px-4 mx-auto">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-medium text-gray-800">Number of reports</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {reportList.length}
        </span>
      </div>

      <div className="flex flex-col px-4 lg:px-0 mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                      <div className="flex items-center gap-x-3">
                        <span>Report Item</span>
                      </div>
                    </th>
                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left text-gray-500">
                      <button className="flex items-center gap-x-2">
                        <span>Date</span>
                        <FaClock />
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      <button className="flex items-center gap-x-2">
                        <span>Location</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                      </button>
                    </th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportList.map((report) => (
                    <tr key={report.id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <div className="flex items-center gap-x-2">
                            {report.isEditing ? (
                              <>
                                <img
                                  className="object-cover w-10 h-10 md:w-20 md:h-20 rounded-md"
                                  src={report.image}
                                  alt={report.name}
                                />
                                <input
                                  type="text"
                                  value={report.name}
                                  onChange={(e) => handleUpdateReport(report.id, 'name', e.target.value)}
                                  className="border px-2 py-1 rounded w-auto md:text-lg"
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  className="object-cover w-10 h-10 md:w-20 md:h-20 rounded-md"
                                  src={report.image}
                                  alt={report.name}
                                />
                                <div>
                                  <h2 className="font-medium md:text-lg text-gray-800">
                                    {report.name}
                                  </h2>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          <h2 className="text-sm font-normal text-emerald-500">
                            {report.date?.day}/{report.date?.month}/{report.date?.year}
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {report.isEditing ? (
                          <input
                            type="text"
                            value={report.location}
                            onChange={(e) => handleUpdateReport(report.id, 'location', e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        ) : (
                          report.location
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => handleDelete(report.id)}
                            className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
                          >
                            <span className="sr-only">Delete</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleEditToggle(report.id)}
                            className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
                          >
                            {report.isEditing ? (
                              <>
                                <span className="sr-only">Save edit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </>
                            ) : (
                              <>
                                <span className="sr-only">Edit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReportsHistory;