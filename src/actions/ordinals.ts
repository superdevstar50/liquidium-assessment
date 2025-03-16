"use server";
import ordinals from "@/data/your_owned_ordinals.json";
import supportedOrdinals from "@/data/supported_ordinal_collections.json";
import { satToBtc } from "@/utils";
import { Ordinal } from "@/types";
import { mapBestOffer } from "./utils";

const supportedOrdinalsSet = new Set(
  supportedOrdinals.map((item) => item.slug)
);

const MIN_FLOOR = 0.00065;

const isAllowedOrdinal = (ordinal: Ordinal) =>
  ordinal.last_sale_price &&
  satToBtc(ordinal.last_sale_price) >= MIN_FLOOR &&
  ordinal.slug &&
  supportedOrdinalsSet.has(ordinal.slug);

export async function fetchOrdinalInfo() {
  let portfolioValue = 0;
  let availableValue = 0;

  for (const ordinal of ordinals.data) {
    const price = satToBtc(ordinal.last_sale_price ?? 0);
    portfolioValue += price;
    if (isAllowedOrdinal(ordinal)) {
      availableValue += price;
    }
  }

  return {
    portfolioValue,
    availableValue,
  };
}

export interface FetchOrdinalsProps {
  query?: string;
  start?: number;
  count?: number;
}

export async function fetchOrdinals({
  query = "",
  start = 0,
  count = 5,
}: FetchOrdinalsProps = {}) {
  const allowedOrdinals = ordinals.data.filter(isAllowedOrdinal);
  if (!query) {
    return await mapBestOffer(allowedOrdinals.slice(start, start + count));
  }

  const clearedQuery = query.toLowerCase().trim();

  return await mapBestOffer(
    allowedOrdinals
      .filter(
        (ordinal) =>
          ordinal.inscription_name?.toLowerCase().includes(clearedQuery) ||
          ordinal.collection_name?.toLowerCase().includes(clearedQuery)
      )
      .slice(start, start + count)
  );
}

export async function fetchOrdinal({ id }: { id: string }) {
  return ordinals.data.find((ordinal) => ordinal.inscription_id === id);
}
