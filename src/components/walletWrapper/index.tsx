import { walletAddress } from "@/actions/wallet";
import { PropsWithChildren } from "react";
import { ConnectWallet } from "./connectWallet";

export async function WalletWrapper({ children }: PropsWithChildren) {
  const isConnected = await walletAddress();

  if (!isConnected) {
    return <ConnectWallet />;
  }

  return children;
}
