"use client";
import { fetchOrdinals, FetchOrdinalsProps } from "@/actions/ordinals";
import { OrdinalItem } from "./ordinalItem";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useEffect } from "react";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useInView } from "react-intersection-observer";

function LoadingUi() {
  return new Array(10)
    .fill(0)
    .map((_, index) => (
      <Skeleton className="md:min-w-52 min-w-44 h-72" key={index} />
    ));
}

export interface OrdinalListProps {
  query: string;
}

export function OrdinalList({ query }: OrdinalListProps) {
  const { ref, inView } = useInView();

  const {
    data: ordinals,
    loading,
    fetchNextPage,
    hasMore,
  } = useInfiniteFetch({
    query: useCallback(
      (params?: FetchOrdinalsProps) =>
        fetchOrdinals({ query, ...(params ?? {}) }),
      [query]
    ),
    initialParams: {
      start: 0,
      count: 10,
    },
    getNextParams: useCallback(
      (lastParams: FetchOrdinalsProps) => ({
        ...lastParams,
        start: (lastParams.start ?? 0) + 10,
      }),
      []
    ),
  });

  useEffect(() => {
    if (inView && hasMore) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasMore]);

  return (
    <div className="p-5 flex gap-5 rounded-3xl border border-neutral-700 overflow-auto">
      {ordinals?.map((ordinal) => (
        <OrdinalItem key={ordinal.inscription_id} data={ordinal} />
      ))}
      {loading && <LoadingUi />}
      {!loading && <div ref={ref} />}
    </div>
  );
}
