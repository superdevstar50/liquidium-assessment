import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { Ordinals } from "./_components/ordinals";
import { Offers } from "./_components/offers";

export default async function Home() {
  return (
    <div className="lg:py-16 lg:px-32 py-4 px-8 flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          Assets
        </h3>
        <Separator />
      </div>
      <Info />
      <Ordinals />
      <Offers />
    </div>
  );
}
