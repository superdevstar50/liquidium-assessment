import { Input } from "@/components/ui/input";
import { OrdinalItem } from "./ordinalItem";
import { OfferDialog } from "../offerDialog";

export function Ordinals() {
  return (
    <div className="py-10 flex flex-col gap-5">
      <OfferDialog />
      <div className="flex justify-center">
        <Input placeholder="Search inscription" className="w-auto min-w-80" />
      </div>
      <div className="p-5 flex gap-5 rounded-3xl border border-neutral-700 overflow-auto">
        {new Array(10).fill(0).map((_, index) => (
          <OrdinalItem key={index} />
        ))}
      </div>
    </div>
  );
}
