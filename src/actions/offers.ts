"use server";

import { Offer } from "@prisma/client";
import db from "@/lib/prisma";

export async function createOffer(offer: Omit<Offer, "id">) {
  const createdOffer = await db.offer.create({
    data: offer,
  });

  return createdOffer;
}
