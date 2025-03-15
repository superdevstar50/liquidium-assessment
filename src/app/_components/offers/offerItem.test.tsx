import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import { formatBTC } from "@/utils";
import userEvent from "@testing-library/user-event";
import { OfferItem } from "./offerItem";

vi.mock("@/actions/offers", () => {
  return {
    deleteOffer: () => {
      console.log("offer deleted");
    },
  };
});

const offerData = {
  amount: 0.5,
  id: "1",
  interest: 2,
  ordinal: {
    inscription_name: "Little Pups #9217",
    inscription_id:
      "f33b8de6db8df30573484aa1f597573dbf72623f842d0d748b7199948262ba99i0",
    inscription_number: 65076023,
    parent_ids: [],
    output_value: 546,
    genesis_block_hash:
      "00000000000000000000c0044459af9803277b736c19d1bd664ee113f861c27e",
    genesis_ts: "2024-03-19T15:14:54.000Z",
    metadata: {
      name: "Little Pups #9217",
      attributes: [
        { value: "6", trait_type: "background" },
        { value: "normal", trait_type: "body" },
        { value: "luki aphex", trait_type: "clothes" },
        { value: "none", trait_type: "accessories" },
        { value: "green glasses", trait_type: "face" },
        { value: "heisenberg", trait_type: "hat" },
        { value: "bag", trait_type: "hand" },
        { value: "none", trait_type: "1/1" },
      ],
    },
    owner_wallet_addr:
      "bc1pgf7ta8xmtnv4jav0anwcyfm3xq2aa28a2nalpvndf6wckt3gl5lssj3gqu",
    mime_type: "text/html;charset=utf-8",
    last_sale_price: 149796,
    slug: "littlepups",
    collection_name: "Little Pups",
    satpoint:
      "f421c4e76168a4bca3cada9433d20fda9a6beb0f30e8ace9e16d5e0ee478eda4:0:0",
    last_transfer_block_height: 869824,
    genesis_height: 835379,
    content_url:
      "https://bis-ord-content.fra1.cdn.digitaloceanspaces.com/ordinals/f33b8de6db8df30573484aa1f597573dbf72623f842d0d748b7199948262ba99i0",
    bis_url:
      "https://bestinslot.xyz/ordinals/inscription/f33b8de6db8df30573484aa1f597573dbf72623f842d0d748b7199948262ba99i0",
    render_url:
      "https://bis-ord-renders.fra1.cdn.digitaloceanspaces.com/renders/f33b8de6db8df30573484aa1f597573dbf72623f842d0d748b7199948262ba99i0.png",
    bitmap_number: null,
    delegate: null,
    floorAmount: 0.8,
  },
  ordinalId:
    "f33b8de6db8df30573484aa1f597573dbf72623f842d0d748b7199948262ba99i0",
  term: 7,
};

describe("offeritem component", () => {
  test("renders", () => {
    render(<OfferItem data={offerData} />);

    expect(screen.getByText("Little Pups")).toBeInTheDocument();
    expect(screen.getByText("Little Pups #9217")).toBeInTheDocument();

    expect(screen.getByText("Offer:").lastChild).toHaveTextContent(
      formatBTC(0.5)
    );
    expect(screen.getByText("Floor:").lastChild).toHaveTextContent(
      formatBTC(0.8)
    );
    expect(screen.getByText("LTV:").lastChild).toHaveTextContent("62%");
    expect(screen.getByText("Days:").lastChild).toHaveTextContent("7");
    expect(screen.getByText("Interest:").lastChild).toHaveTextContent("2%");

    expect(screen.getByTestId("edit")).toBeInTheDocument();
    expect(screen.getByTestId("delete")).toBeInTheDocument();
  });

  test("edit", async () => {
    render(<OfferItem data={offerData} />);

    await userEvent.click(screen.getByTestId("edit"));

    expect(screen.getByText("Edit custom request")).toBeInTheDocument();
  });

  test("delete", async () => {
    const consoleMock = vi.fn();
    console.log = consoleMock;

    render(<OfferItem data={offerData} />);

    await userEvent.click(screen.getByTestId("delete"));

    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This action cannot be undone. This will permanently delete your offer and remove your data from our servers."
      )
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(consoleMock).toHaveBeenCalledWith("offer deleted");
  });
});
