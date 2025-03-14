import { Card, CardContent } from "@/components/ui/card";
import { OfferList } from "./offerList";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingUi() {
  return new Array(5)
    .fill(0)
    .map((_, index) => (
      <Skeleton key={index} className="rounded-full w-full h-10" />
    ));
}

export function Offers() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-xl font-semibold">Your offers</div>
      <Card className="bg-[#141414]">
        <CardContent className="flex flex-col gap-4">
          <Suspense fallback={<LoadingUi />}>
            <OfferList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
