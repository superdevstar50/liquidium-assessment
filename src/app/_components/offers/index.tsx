import { Card, CardContent } from "@/components/ui/card";
import { OfferItem } from "./offerItem";

export function Offers() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-xl font-semibold">Your offers</div>
      <Card>
        <CardContent className="flex flex-col gap-4">
          {new Array(10).fill(0).map((_, index) => (
            <OfferItem key={index} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
