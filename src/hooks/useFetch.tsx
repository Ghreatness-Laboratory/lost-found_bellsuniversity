import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

interface FetchError {
  status: number | null;
  message: string;
}

export const BASE_URL = process.env.REACT_APP_API_URL;

if (!BASE_URL) {
  throw new Error(
    "BASE_URL is not defined. Please check your environment variables."
  );
}

const useFetch = <T,>(
  url: string,
  options: AxiosRequestConfig = {}
): { data: T | undefined; loading: boolean; error: FetchError | null } => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await axios({
          url: `${BASE_URL}${url}`,
          ...options,
        });
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError({
            status: err.response?.status || null,
            message:
              err.response?.data?.message ||
              "Failed to fetch data. Please try again.",
          });
        } else {
          setError({ status: null, message: "An unknown error occurred." });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};

export default useFetch;
