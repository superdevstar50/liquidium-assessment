import { fetchOrdinal } from "@/actions/ordinals";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/useFetch";
import { formatInscriptionId } from "@/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ScanSearch } from "lucide-react";
import { useCallback } from "react";

function LoadingUi() {
  return <Skeleton className="w-full h-36 rounded-xl" />;
}
export interface OrdinalInfoProps {
  ordinalId: string;
}

export function OrdinalInfo({ ordinalId }: OrdinalInfoProps) {
  const { data, loading } = useFetch({
    query: useCallback(() => fetchOrdinal({ id: ordinalId }), [ordinalId]),
  });

  if (loading) {
    return <LoadingUi />;
  }

  if (!data) {
    return;
  }

  const handleView = () => {
    if (!data.bis_url) {
      return;
    }

    window.open(data.bis_url);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={
              data.render_url ??
              `https://bis-ord-content.fra1.cdn.digitaloceanspaces.com/ordinals/${data.inscription_id}`
            }
          />
          <AvatarFallback />
        </Avatar>
        <div className="w-full">
          <div className="flex justify-between items-center">
            Collection:
            <span className="font-semibold text-neutral-100">
              {data.collection_name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            Name:
            <span className="font-semibold text-neutral-100">
              {data.inscription_name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            Ordinal id:
            <span className="font-semibold text-neutral-100">
              {formatInscriptionId(data.inscription_id, "long")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            Insc number:
            <span className="font-semibold text-neutral-100">
              {data.inscription_number}
            </span>
          </div>
        </div>
      </div>
      <Button type="button" variant="outline" onClick={handleView}>
        <ScanSearch />
        View
      </Button>
    </div>
  );
}
