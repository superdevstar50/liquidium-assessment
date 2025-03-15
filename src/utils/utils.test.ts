import { expect, test } from "vitest";
import { describe } from "node:test";
import {
  calculateAPRandAPY,
  formatBTC,
  formatInscriptionId,
  formatUSD,
  satToBtc,
} from ".";

describe("utils", () => {
  test("satToBtc", () => {
    expect(satToBtc(58329)).toBe(0.00058329);
  });

  test("formatInscriptionId", () => {
    expect(formatInscriptionId("abcdefghijklmno")).toBe("abcde...lmno");
    expect(formatInscriptionId("abcdefghijklmnopqr", "long")).toBe(
      "abcdefghijkl...opqr"
    );

    expect(formatInscriptionId("abcdefghi")).toBe("abcdefghi");
  });

  test("formatUSD", () => {
    expect(formatUSD(1234567.89)).toBe("$1,234,567.89");
  });

  test("formatBTC", () => {
    expect(formatBTC(0.534)).toBe("₿0.534");
    expect(formatBTC(0.5344375893)).toBe("₿0.534438");
  });

  test("calculateAPRandAPY", () => {
    expect(calculateAPRandAPY(2, 7)).toEqual({ apr: 104, apy: 180 });
  });
});
