"use server";
import ordinals from "@/data/your_owned_ordinals.json";
import supportedOrdinals from "@/data/supported_ordinal_collections.json";
import { satToBtc } from "@/utils";
import { Ordinal } from "@/types";

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

export async function fetchOrdinals({ query = "" }: { query?: string } = {}) {
  const allowedOrdinals = ordinals.data.filter(isAllowedOrdinal);
  if (!query) {
    return allowedOrdinals.slice(0, 10);
  }

  const clearedQuery = query.toLowerCase().trim();

  return allowedOrdinals
    .filter(
      (ordinal) =>
        ordinal.inscription_name?.toLowerCase().includes(clearedQuery) ||
        ordinal.collection_name?.toLowerCase().includes(clearedQuery)
    )
    .slice(0, 10);
}

export async function fetchOrdinal({ id }: { id: string }) {
  return ordinals.data.find((ordinal) => ordinal.inscription_id === id);
}
