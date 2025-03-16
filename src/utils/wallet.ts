import crypto from "crypto";

function generateRandomHash() {
  return crypto.randomBytes(32).toString("hex");
}

export function getWalletAddress() {
  const walletAddress = localStorage.getItem("wallet");

  if (!walletAddress) {
    const newWalletAddress = generateRandomHash();
    localStorage.setItem("wallet", newWalletAddress);

    return newWalletAddress;
  }

  return walletAddress;
}
