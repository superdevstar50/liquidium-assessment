"use server";

import { cookies } from "next/headers";

export async function walletAddress() {
  const cookieStore = await cookies();

  const walletAddress = cookieStore.get("wallet")?.value;

  if (!walletAddress) {
    return null;
  }

  return walletAddress;
}

export async function setUpWalletAddress(walletAddress: string) {
  const cookieStore = await cookies();

  cookieStore.set("wallet", walletAddress);
}
