"use client";
import { setUpWalletAddress } from "@/actions/wallet";
import { Button } from "../ui/button";
import { getWalletAddress } from "@/utils/wallet";

export function ConnectWallet() {
  const handleConnectWallet = () => {
    setUpWalletAddress(getWalletAddress());
  };

  return (
    <div className="lg:py-16 lg:px-32 py-4 px-8 flex flex-col gap-10">
      <Button onClick={handleConnectWallet}>Connect Wallet</Button>
    </div>
  );
}
