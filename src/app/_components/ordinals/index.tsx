"use client";
import { OfferDialog } from "../offerDialog";
import { useState } from "react";
import { OrdinalList } from "./ordinalList";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

export function Ordinals() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  return (
    <div className="py-10 flex flex-col gap-5">
      <OfferDialog />
      <div className="flex justify-center">
        <Input
          placeholder="Search inscription"
          className="w-auto min-w-80"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="p-5 flex gap-5 rounded-3xl border border-neutral-700 overflow-auto">
        <OrdinalList query={debouncedQuery} />
      </div>
    </div>
  );
}
