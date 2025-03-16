import { fetchOffers } from "@/actions/offers";
import { OfferItem } from "./offerItem";
import { walletAddress } from "@/actions/wallet";
import { ConnectWallet } from "@/components/walletWrapper/connectWallet";

export async function OfferList() {
  const address = await walletAddress();

  if (!address) {
    return <ConnectWallet />;
  }

  const offers = await fetchOffers({ walletAddress: address });

  if (offers.length === 0) {
    return <>You haven&apos;t created any offers yet.</>;
  }

  return offers.map((offer) => <OfferItem key={offer.id} data={offer} />);
}
