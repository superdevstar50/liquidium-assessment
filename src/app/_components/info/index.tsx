import { fetchOrdinalInfo } from "@/actions/ordinals";
import { InfoItem } from "./infoItem";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingUi() {
  return (
    <div className="flex flex-col md:flex-row gap-2.5">
      <Skeleton className="w-full h-24 rounded-xl" />
      <Skeleton className="w-full h-24 rounded-xl" />
    </div>
  );
}

async function InfoContent() {
  const { availableValue, portfolioValue } = await fetchOrdinalInfo();

  return (
    <div className="flex flex-col md:flex-row gap-2.5">
      {[
        { title: "Total portfolio value", amount: portfolioValue },
        { title: "Available liquidity", amount: availableValue },
      ].map((infoData) => (
        <InfoItem key={infoData.title} {...infoData} />
      ))}
    </div>
  );
}

export function Info() {
  return (
    <Suspense fallback={<LoadingUi />}>
      <InfoContent />
    </Suspense>
  );
}
