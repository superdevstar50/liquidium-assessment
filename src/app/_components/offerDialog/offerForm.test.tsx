import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import { OfferForm } from "./offerForm";
import { FormWrapper } from "@/tests/render/formwrapper";
import userEvent from "@testing-library/user-event";
import { formatBTC, formatUSD } from "@/utils";
import { ONE_BTC_IN_USD } from "@/consts";

describe("offerform component", () => {
  test("renders", () => {
    render(
      <FormWrapper>
        <OfferForm />
      </FormWrapper>
    );

    expect(screen.getByLabelText("Term")).toBeInTheDocument();
    expect(screen.getByLabelText("Interest")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();

    expect(
      screen.getByText("If the borrower fails to repay, the loan defaults.")
    ).toBeInTheDocument();
  });

  test("submit", async () => {
    const handleSubmit = vi.fn();
    render(
      <FormWrapper onSubmit={handleSubmit}>
        <OfferForm />
      </FormWrapper>
    );

    await userEvent.type(screen.getByLabelText("Term"), "7");
    await userEvent.type(screen.getByLabelText("Amount"), "0.5");
    await userEvent.type(screen.getByLabelText("Interest"), "20");

    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(handleSubmit).toHaveBeenCalledWith({
      term: 7,
      amount: 0.5,
      interest: 20,
    });
  });

  test("reaction", async () => {
    const handleSubmit = vi.fn();
    render(
      <FormWrapper onSubmit={handleSubmit}>
        <OfferForm />
      </FormWrapper>
    );

    await userEvent.type(screen.getByLabelText("Term"), "7");
    await userEvent.type(screen.getByLabelText("Amount"), "0.5");
    await userEvent.type(screen.getByLabelText("Interest"), "2");

    expect(
      screen.getByText(formatUSD(0.5 * ONE_BTC_IN_USD))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${formatBTC(0.02 * 0.5)} | ${formatUSD(0.02 * 0.5 * ONE_BTC_IN_USD)}`
      )
    ).toBeInTheDocument();

    expect(screen.getByText(/180% APY/i)).toBeInTheDocument();
    expect(screen.getByText(/104% APR/i)).toBeInTheDocument();
  });
});
