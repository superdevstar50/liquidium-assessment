export function satToBtc(input: number) {
  return input / 100000000;
}

export function formatInscriptionId(input: string) {
  return `${input.slice(0, 5)}...${input.slice(input.length - 4)}`;
}

export function formatUSD(input: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(input);
}

export function formatBTC(input: number) {
  return `₿${input.toFixed(6)}`;
}
