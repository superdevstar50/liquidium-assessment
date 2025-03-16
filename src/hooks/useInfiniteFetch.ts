import { useCallback, useEffect, useRef, useState } from "react";

export interface UseInfiniteFetchProps<T, U> {
  query: (params?: U) => Promise<T[]>;
  initialParams?: U;
  getNextParams?: (lastParams: U) => U;
}

export function useInfiniteFetch<T, U>({
  query,
  initialParams,
  getNextParams,
}: UseInfiniteFetchProps<T, U>) {
  const [data, setData] = useState<T[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [hasMore, setHasMore] = useState(true);

  const lastParams = useRef<U>(undefined);

  const fetchNextPage = useCallback(() => {
    setLoading(true);

    const queryParams =
      lastParams.current && getNextParams
        ? getNextParams(lastParams.current)
        : initialParams;

    query(queryParams)
      .then((data) => {
        lastParams.current = queryParams;

        if (data.length === 0) {
          setHasMore(false);
          return;
        }

        setData((_data) => [...(_data ?? []), ...data]);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  useEffect(() => {
    setData(undefined);
    lastParams.current = undefined;
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return { data, loading, error, fetchNextPage, hasMore };
}
