import { useState, useEffect } from 'react';

interface ItemsProps { }

const useFetch = (url: string) => {
  const [data, setData] = useState<ItemsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Reload Page, ${Error}`);
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort()
    }
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
