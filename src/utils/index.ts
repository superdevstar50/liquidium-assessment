export function satToBtc(input: number) {
  return input / 100000000;
}

export type InscriptionFormatType = "short" | "long";

export function formatInscriptionId(
  input: string,
  format: InscriptionFormatType = "short"
) {
  let showLen = 5;

  if (format === "long") {
    showLen = 12;
  } else if (format === "short") {
    showLen = 5;
  }

  if (input.length <= showLen + 4) {
    return input;
  }

  return `${input.slice(0, showLen)}...${input.slice(input.length - 4)}`;
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
  return `₿${parseFloat(input.toFixed(6))}`;
}

export const sleep = (time: number) =>
  new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, time)
  );

export function calculateAPRandAPY(
  interest: number,
  termDays: number
): { apr: number; apy: number } {
  const apr = (interest / termDays) * 365;

  const apy = ((1 + interest / 100) ** (365 / termDays) - 1) * 100;

  return { apr: Math.floor(apr), apy: Math.floor(apy) };
}
