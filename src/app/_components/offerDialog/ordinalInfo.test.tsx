import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import { OrdinalInfo } from "./ordinalInfo";
import { formatInscriptionId } from "@/utils";
import userEvent from "@testing-library/user-event";

vi.mock("@/actions/ordinals", () => {
  return {
    fetchOrdinal: async () => ({
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
    }),
  };
});

describe("ordinalinfo component", () => {
  test("renders", async () => {
    render(<OrdinalInfo ordinalId="1" />);

    expect(await screen.findByText("Little Pups")).toBeInTheDocument();
    expect(screen.getByText("Little Pups #9217")).toBeInTheDocument();
    expect(
      screen.getByText(
        formatInscriptionId(
          "f33b8de6db8df30573484aa1f597573dbf72623f842d0d748b7199948262ba99i0",
          "long"
        )
      )
    ).toBeInTheDocument();
    expect(screen.getByText("65076023")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "View" })).toBeInTheDocument();
  });

  test("click view button", async () => {
    const mockOpen = vi.fn();
    window.open = mockOpen;

    render(<OrdinalInfo ordinalId="1" />);

    const button = await screen.findByRole("button", { name: "View" });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(mockOpen).toHaveBeenCalledWith(
      "https://bestinslot.xyz/ordinals/inscription/f33b8de6db8df30573484aa1f597573dbf72623f842d0d748b7199948262ba99i0"
    );
  });
});
