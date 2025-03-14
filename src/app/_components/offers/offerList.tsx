import { fetchOffers } from "@/actions/offers";
import { OfferItem } from "./offerItem";

export async function OfferList() {
  const offers = await fetchOffers();

  return offers.map((offer, index) => <OfferItem key={index} data={offer} />);
}
