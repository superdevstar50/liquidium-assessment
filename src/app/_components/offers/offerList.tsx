import { fetchOffers } from "@/actions/offers";
import { OfferItem } from "./offerItem";

export async function OfferList() {
  const offers = await fetchOffers();

  if (offers.length === 0) {
    return <>You haven&apos;t created any offers yet.</>;
  }

  return offers.map((offer, index) => <OfferItem key={index} data={offer} />);
}
