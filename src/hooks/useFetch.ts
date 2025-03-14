import { useEffect, useState } from "react";

export interface UseFetchProps<T> {
  query: () => Promise<T>;
}

export function useFetch<T>({ query }: UseFetchProps<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    query()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  return { data, loading, error };
}
