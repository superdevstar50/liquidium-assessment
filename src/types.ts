import ordinals from "@/data/your_owned_ordinals.json";
import { Offer } from "@prisma/client";

export type Ordinal = (typeof ordinals.data)[number];

export type OrdinalWithBestOffer = Ordinal & {
  bestOfferAmount: number;
};

export type OrdinalWithFloor = Ordinal & {
  floorAmount: number | null;
};

export interface OfferWithOrdinal extends Offer {
  ordinal: Ordinal & {
    floorAmount: number | null;
  };
}
