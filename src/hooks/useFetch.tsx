import { useState, useEffect } from 'react';

interface ItemsProps {
  name: string;
  date?: {
    day: number;
    month: number;
    year: number;
  };
  image: string;
}

const useFetch = (url: string) => {
  const [data, setData] = useState<ItemsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Reload Page');
        const result = await response.json();
        setData(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
