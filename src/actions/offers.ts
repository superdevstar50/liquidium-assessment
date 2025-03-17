"use server";

import { Offer } from "@prisma/client";
import db from "@/lib/prisma";
import ordinals from "@/data/your_owned_ordinals.json";
import { mapCollectionFloor } from "./utils";
import { revalidatePath } from "next/cache";
import { walletAddress } from "./wallet";

export async function createOffer(offer: Omit<Offer, "id">) {
  const createdOffer = await db.offer.create({
    data: offer,
  });

  revalidatePath("/");

  return createdOffer;
}

export async function updateOffer({
  id,
  ...offer
}: Omit<Offer, "ordinalId" | "walletAddress">) {
  const updatedOffer = await db.offer.update({
    where: {
      id: id,
    },
    data: offer,
  });

  revalidatePath("/");

  return updatedOffer;
}

export async function fetchOffers({
  walletAddress,
}: {
  walletAddress: string;
}) {
  const offers = await db.offer.findMany({
    where: {
      walletAddress,
    },
  });

  return await Promise.all(
    offers.map(async (offer) => ({
      ...offer,
      ordinal: (
        await mapCollectionFloor([
          ordinals.data.find(
            (ordinal) => ordinal.inscription_id === offer.ordinalId
          )!,
        ])
      )[0],
    }))
  );
}

export async function fetchOffersWithOrdinalId({ id }: { id: string }) {
  const wallet = await walletAddress();
  if (!wallet) {
    return [];
  }

  const offers = await db.offer.findMany({
    where: {
      ordinalId: id,
      walletAddress: wallet,
    },
  });

  return offers;
}

export async function deleteOffer({ id }: { id: string }) {
  const deletedOffer = await db.offer.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");

  return deletedOffer;
}
