"use client";
import { fetchOrdinals } from "@/actions/ordinals";
import { OrdinalItem } from "./ordinalItem";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/useFetch";
import { useCallback } from "react";
import { useEvent } from "@/hooks/useEvent";

function LoadingUi() {
  return new Array(5)
    .fill(0)
    .map((_, index) => (
      <Skeleton className="md:min-w-52 min-w-44 h-72" key={index} />
    ));
}

export interface OrdinalListProps {
  query: string;
}

export function OrdinalList({ query }: OrdinalListProps) {
  const {
    data: ordinals,
    loading,
    refetch,
  } = useFetch({
    query: useCallback(() => fetchOrdinals({ query }), [query]),
  });

  useEvent(
    "onOfferUpdate",
    useCallback(() => {
      refetch(true);
    }, [refetch])
  );

  if (loading) {
    return <LoadingUi />;
  }

  return ordinals?.map((ordinal, index) => (
    <OrdinalItem key={index} data={ordinal} />
  ));
}
