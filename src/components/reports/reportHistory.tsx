import React, { useEffect, useMemo, useState } from "react";
import { FaClock, FaSearch } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import { ReportProps } from "../../types/report.types";
import Loader from "../common/loader";

interface EditableReport extends ReportProps {
  isEditing: boolean;
}

const ReportsHistory: React.FC = () => {
  const {
    data: reports,
    loading,
    error,
  } = useFetch<ReportProps[]>("/reports/");
  const [reportList, setReportList] = useState<EditableReport[]>([]);

  useEffect(() => {
    if (reports) {
      setReportList(
        reports.map((report) => ({
          ...report,
          id: report.id ?? 0,
          isEditing: false,
        }))
      );
    }
  }, [reports]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  const filteredItems = useMemo(() => {
    return reportList.filter(
      (report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reportList, searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  const handleDelete = (idToDelete: number) => {
    setReportList((currentReports) =>
      currentReports.filter((report) => report.id !== idToDelete)
    );
  };

  const handleEditToggle = (idToToggle: number) => {
    setReportList((currentReports) =>
      currentReports.map((report) =>
        report.id === idToToggle
          ? { ...report, isEditing: !report.isEditing }
          : report
      )
    );
  };

  const handleUpdateReport = (
    idToUpdate: number,
    field: keyof ReportProps,
    value: string | { day: number; month: number; year: number }
  ) => {
    setReportList((currentReports) =>
      currentReports.map((report) =>
        report.id === idToUpdate ? { ...report, [field]: value } : report
      )
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] my-10 max-w-[1280px] mx-4 sm:mx-8 xl:mx-auto px-4 sm:px-8 lg:px-10 bg-red-50/10 text-red-500 rounded-lg shadow-sm text-center">
        <h1 className="text-3xl font-bold">Oops!</h1>
        <p className="text-lg mt-2">
          Something went wrong while fetching the reports.
        </p>
        <p className="text-base mt-1">
          Error {error.status}: {error.message}
        </p>
        <button
          className="mt-4 py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="relative mb-4 lg:px-0 w-full md:max-w-xl">
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-12 py-2 border-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch
          className="absolute top-1/2 left-5 -translate-y-1/2"
          color="gray"
        />
      </div>

      <div className="flex items-center gap-3 mb-4 px-0">
        <h2 className="text-lg font-medium text-gray-800">Number of reports</h2>
        <span className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-md">
          {filteredItems.length}
        </span>
      </div>

      {filteredItems.length === 0 ? (
        <div className="grid place-items-center min-h-[50vh] px-4">
          <div className="flex flex-col items-center gap-4 p-6">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              No Results Found
            </h1>
            <p className="text-center text-gray-600 max-w-md">
              We couldn&apos;t find anything matching your search or filters.
              Please try again.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col mt-6 min-h-[60vh] ">
            <div className="border border-gray-200 md:rounded-lg overflow-x-auto">
              <table className="w-full min-w-[800px] divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Report Item</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal flex sm:block justify-center text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Date</span>
                        <FaClock />
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-10 py-3.5 text-sm font-normal text-left text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Location</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                          />
                        </svg>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 px-4 text-sm font-normal text-gray-500 text-left"
                    >
                      <span className="sr-only">Actions</span>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedItems.map((report) => (
                    <tr key={report.id}>
                      <td className="px-2 md:px-4 py-4 md:py-5 text-sm font-medium text-gray-700">
                        <div className="inline-flex items-center gap-x-3">
                          <div className="flex items-center gap-x-2">
                            {report.isEditing ? (
                              <>
                                <div className="w-20 h-14 md:w-40 md:h-20">
                                  <img
                                    className="object-cover rounded-md w-full h-full"
                                    src={report.image}
                                    alt={report.title}
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={report.title}
                                  onChange={(e) =>
                                    handleUpdateReport(
                                      report.id,
                                      "title",
                                      e.target.value
                                    )
                                  }
                                  className="border px-2 py-1 rounded lg:w-[300px] md:text-lg"
                                />
                              </>
                            ) : (
                              <>
                                <div className="w-20 h-14 md:w-40 md:h-20">
                                  <img
                                    className="object-cover rounded-md w-full h-full"
                                    src={report.image}
                                    alt={report.title}
                                  />
                                </div>
                                <h2 className="font-medium md:text-lg w-[200px] md:w-[250px] lg:w-[300px] text-gray-800 overflow-hidden">
                                  {report.title}
                                </h2>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          <h2 className="text-sm font-normal text-emerald-500">
                            {report.date_reported}
                          </h2>
                        </div>
                      </td>
                      <td className="px-10 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {report.isEditing ? (
                          <input
                            type="text"
                            value={report.location}
                            onChange={(e) =>
                              handleUpdateReport(
                                report.id,
                                "location",
                                e.target.value
                              )
                            }
                            className="border px-2 py-1 rounded lg:max-w-[150px] w-full "
                          />
                        ) : (
                          <div className="max-w-[150px] w-full">
                            <p className="overflow-hidden">{report.location}</p>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => handleDelete(report.id)}
                            className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleEditToggle(report.id)}
                            className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
                          >
                            {report.isEditing ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
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

          {filteredItems.length > 0 && (
            <div className="flex items-center justify-center gap-4 max-w-[600px] mx-auto mt-8 text-sm md:text-base">
              <button
                className={`py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition ${
                  currentPage === 1 && "cursor-not-allowed opacity-50"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-lg font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition ${
                  currentPage === totalPages && "cursor-not-allowed opacity-50"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ReportsHistory;
