import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { InfoItem } from "./infoItem";
import { formatBTC, formatUSD } from "@/utils";
import { ONE_BTC_IN_USD } from "@/consts";
import { describe } from "node:test";

describe("infoitem component", () => {
  test("renders", () => {
    const amount = 0.582;
    render(<InfoItem amount={amount} title="Title" />);

    expect(screen.getByText(formatBTC(amount))).toBeInTheDocument();
    expect(
      screen.getByText(formatUSD(amount * ONE_BTC_IN_USD))
    ).toBeInTheDocument();
  });
});
