"use client";
import { useState } from "react";
import { OrdinalList } from "./ordinalList";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";

export function Ordinals() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  return (
    <div className="py-10 flex flex-col gap-5">
      <div className="flex justify-center">
        <Input
          placeholder="Search inscription"
          className="w-auto min-w-80"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          endIcon={<Search className="w-4 h-4" />}
        />
      </div>

      <OrdinalList query={debouncedQuery} />
    </div>
  );
}
