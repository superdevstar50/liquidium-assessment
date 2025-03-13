import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ScanSearch } from "lucide-react";

export function OrdinalInfo() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://bis-ord-renders.fra1.cdn.digitaloceanspaces.com/renders/d51acc6377ec4ccc14cf6b4cf0a695c7be055b3ba065760bff60de55bdfb8fbei0.png" />
        </Avatar>
        <div className="w-full">
          <div className="flex justify-between items-center">
            Collection:
            <span className="font-semibold text-neutral-100">NFC Ordinals</span>
          </div>
          <div className="flex justify-between items-center">
            Name:
            <span className="font-semibold text-neutral-100">
              Ordinal NPCs #3210
            </span>
          </div>
          <div className="flex justify-between items-center">
            Ordinal id:
            <span className="font-semibold text-neutral-100">
              bfd427857843578f
            </span>
          </div>
          <div className="flex justify-between items-center">
            Insc number:
            <span className="font-semibold text-neutral-100">7864321</span>
          </div>
        </div>
      </div>
      <Button variant="outline">
        <ScanSearch />
        View
      </Button>
    </div>
  );
}
