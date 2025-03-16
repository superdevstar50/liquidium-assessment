import { useCallback, useEffect, useState } from "react";

export interface UseFetchProps<T> {
  query: () => Promise<T>;
}

export function useFetch<T>({ query }: UseFetchProps<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const refetch = useCallback(
    (backgroundMode = false) => {
      if (!backgroundMode) {
        setLoading(true);
      }
      query()
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          if (!backgroundMode) {
            setLoading(false);
          }
        });
    },
    [query]
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
