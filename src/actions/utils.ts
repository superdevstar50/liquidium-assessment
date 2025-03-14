"use server";
import ordinals from "@/data/your_owned_ordinals.json";
import { Ordinal } from "@/types";
import { fetchOffersWithOrdinalId } from "./offers";
import { satToBtc } from "@/utils";

export async function mapBestOffer(ordinals: Ordinal[]) {
  const offers = await Promise.all(
    ordinals.map((ordinal) =>
      fetchOffersWithOrdinalId({ id: ordinal.inscription_id })
    )
  );
  return ordinals.map((ordinal, index) => ({
    ...ordinal,
    bestOfferAmount: offers[index].reduce(
      (acc, offer) => (acc < offer.amount ? offer.amount : acc),
      0
    ),
  }));
}

export async function mapCollectionFloor(_ordinals: Ordinal[]) {
  return _ordinals.map((ordinal) => {
    const floorAmount = ordinals.data
      .filter(
        (_ordinal) => _ordinal.collection_name === ordinal.collection_name
      )
      .reduce(
        (acc, ordinal) =>
          ordinal.last_sale_price && acc > ordinal.last_sale_price
            ? ordinal.last_sale_price
            : acc,
        Infinity
      );
    return {
      ...ordinal,
      floorAmount: floorAmount === Infinity ? null : satToBtc(floorAmount),
    };
  });
}
