import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ACCESS_TOKEN, CSRF_TOKEN } from "../../constants";
import { BASE_URL } from "../../hooks/useFetch";

interface ReportFormData {
  title: string;
  description: string;
  location: string;
  status: "lost" | "found";
  reporter?: number;
  phone_number: string;
  image?: File;
  id?: number;
}

interface ReportPreviewProps {
  image?: File | null;
  title?: string;
  date_reported?: string;
  description: string;
  location?: string;
  phone_number?: string;
  status?: "lost" | "found";
  onReportSubmit: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({
  image,
  title,
  date_reported,
  description,
  location,
  phone_number,
  status,
  onCancel,
  onReportSubmit,
  isOpen,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image && image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const validateFormData = (data: Partial<ReportFormData>): boolean => {
    if (!data.title || data.title.length < 1 || data.title.length > 30) {
      setSubmissionError("Title must be between 1 and 30 characters");
      return false;
    }
    if (!data.description || data.description.length < 1) {
      setSubmissionError("Description is required");
      return false;
    }
    if (!data.location || data.location.length < 1) {
      setSubmissionError("Location is required");
      return false;
    }
    if (
      !data.phone_number ||
      data.phone_number.length < 1 ||
      data.phone_number.length > 11
    ) {
      setSubmissionError("Phone number must be between 1 and 11 characters");
      return false;
    }
    if (!data.status || !["lost", "found"].includes(data.status)) {
      setSubmissionError("Status must be either 'lost' or 'found'");
      return false;
    }
    return true;
  };

  const handleReportSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const csrfToken = CSRF_TOKEN;

    if (!csrfToken || !accessToken) {
      setSubmissionError("Authentication error. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    const reportData: ReportFormData = {
      title: title || "",
      description: description,
      location: location || "",
      status: status || "lost",
      phone_number: phone_number || "",
    };

    if (!validateFormData(reportData)) {
      setIsSubmitting(false);
      return;
    }

    Object.entries(reportData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value.toString());
      }
    });

    // Handle image upload
    if (image && image instanceof File) {
      formData.append("image", image);
    }

    try {
      await axios.post(`${BASE_URL}/reports/`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      });

      alert("Report submitted successfully!");
      onReportSubmit();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to submit the report. Please try again.";
        setSubmissionError(errorMessage);

        // Handle token expiration
        if (error.response?.status === 401) {
          setSubmissionError("Your session has expired. Please log in again.");
        }
      } else {
        setSubmissionError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Preview Report
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="relative">
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl}
              alt="Lost and Found Item"
              className="w-full h-56 object-cover"
            />
          ) : (
            <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-700">Status: {status}</p>
            <p className="text-gray-700">Location: {location}</p>
            {phone_number && (
              <p className="text-gray-600 mt-2">Contact: {phone_number}</p>
            )}
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 27 27"
                fill="none"
              >
                <path
                  d="M21.375 6.75H5.625C4.38236 6.75 3.375 7.75736 3.375 9V21.375C3.375 22.6176 4.38236 23.625 5.625 23.625H21.375C22.6176 23.625 23.625 22.6176 23.625 21.375V9C23.625 7.75736 22.6176 6.75 21.375 6.75Z"
                  stroke="#1E1E1E"
                  strokeWidth="2.66667"
                />
                <path
                  d="M3.375 11.25C3.375 9.12825 3.375 8.0685 4.03425 7.40925C4.6935 6.75 5.75325 6.75 7.875 6.75H19.125C21.2467 6.75 22.3065 6.75 22.9657 7.40925C23.625 8.0685 23.625 9.12825 23.625 11.25H3.375Z"
                  fill="#1E1E1E"
                />
                <path
                  d="M7.875 3.375V6.75M19.125 3.375V6.75"
                  stroke="#1E1E1E"
                  strokeWidth="2.66667"
                  strokeLinecap="round"
                />
                <path
                  d="M11.8125 13.5H8.4375C8.12684 13.5 7.875 13.7518 7.875 14.0625V15.1875C7.875 15.4982 8.12684 15.75 8.4375 15.75H11.8125C12.1232 15.75 12.375 15.4982 12.375 15.1875V14.0625C12.375 13.7518 12.1232 13.5 11.8125 13.5Z"
                  fill="#1E1E1E"
                />
                <path
                  d="M11.8125 18H8.4375C8.12684 18 7.875 18.2518 7.875 18.5625V19.6875C7.875 19.9982 8.12684 20.25 8.4375 20.25H11.8125C12.1232 20.25 12.375 19.9982 12.375 19.6875V18.5625C12.375 18.2518 12.1232 18 11.8125 18Z"
                  fill="#1E1E1E"
                />
                <path
                  d="M18.5625 13.5H15.1875C14.8768 13.5 14.625 13.7518 14.625 14.0625V15.1875C14.625 15.4982 14.8768 15.75 15.1875 15.75H18.5625C18.8732 15.75 19.125 15.4982 19.125 15.1875V14.0625C19.125 13.7518 18.8732 13.5 18.5625 13.5Z"
                  fill="#1E1E1E"
                />
                <path
                  d="M18.5625 18H15.1875C14.8768 18 14.625 18.2518 14.625 18.5625V19.6875C14.625 19.9982 14.8768 20.25 15.1875 20.25H18.5625C18.8732 20.25 19.125 19.9982 19.125 19.6875V18.5625C19.125 18.2518 18.8732 18 18.5625 18Z"
                  fill="#1E1E1E"
                />
              </svg>
              <p className="text-sm">{date_reported}</p>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {submissionError && (
            <p className="text-red-500 text-center text-sm bg-red-50 p-2 rounded">
              {submissionError}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleReportSubmit}
              className={`flex-1 bg-blue-400 text-white px-4 py-2 rounded-md active:bg-blue-500 md:hover:bg-blue-500 transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            <button
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md active:bg-gray-300 md:hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;
