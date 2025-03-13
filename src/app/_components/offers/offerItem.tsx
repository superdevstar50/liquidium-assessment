import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from "lucide-react";

export function OfferItem() {
  return (
    <div className="flex justify-between items-center gap-2.5 p-2.5 rounded-md md:rounded-full bg-neutral-800">
      <div className="flex flex-col md:flex-row items-center gap-2.5">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://bis-ord-renders.fra1.cdn.digitaloceanspaces.com/renders/d51acc6377ec4ccc14cf6b4cf0a695c7be055b3ba065760bff60de55bdfb8fbei0.png" />
        </Avatar>
        <div className="font-semibold">
          Quantum Cat <span className="font-normal">#4345</span>
        </div>
        <div>
          <Badge className="text-xs" variant="secondary">
            Offer: <span className="font-semibold">₿0.2223</span>
          </Badge>
          <Badge className="text-xs" variant="secondary">
            Floor: <span className="font-semibold">₿0.2223</span>
          </Badge>
          <Badge className="text-xs" variant="secondary">
            LTV: <span className="font-semibold">67% </span>
          </Badge>
          <Badge className="text-xs" variant="secondary">
            Days: <span className="font-semibold">2</span>
          </Badge>
          <Badge className="text-xs" variant="secondary">
            Interest: <span className="font-semibold">5%</span>
          </Badge>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2.5">
        <Button variant="secondary" className="rounded-full">
          <Pen />
        </Button>
        <Button variant="destructive" className="rounded-full">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
