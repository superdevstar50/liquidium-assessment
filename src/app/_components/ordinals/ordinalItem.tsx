import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrdinalWithBestOffer } from "@/types";
import { formatBTC, formatInscriptionId, satToBtc } from "@/utils";
import { useState } from "react";
import { OfferDialog } from "../offerDialog";

export interface OrdinalItemProps {
  data: OrdinalWithBestOffer;
}

export function OrdinalItem({ data }: OrdinalItemProps) {
  const [open, setOpen] = useState(false);

  const handleCreateOffer = () => {
    setOpen(true);
  };

  return (
    <Card className="p-0">
      <CardContent className="p-4 flex flex-col gap-3 md:min-w-64 md:max-w-64 min-w-44 max-w-44">
        <div className="flex justify-center">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={
                data.render_url ??
                `https://bis-ord-content.fra1.cdn.digitaloceanspaces.com/ordinals/${data.inscription_id}`
              }
            />
            <AvatarFallback />
          </Avatar>
        </div>

        <div>
          <div className="font-semibold text-xl truncate">
            {data.collection_name}
          </div>
          <div className="text-neutral-500 text-sm truncate">
            Name: {data.inscription_name}
          </div>
          <div className="text-neutral-500 text-sm">
            ID: {formatInscriptionId(data.inscription_id)}
          </div>
          <div className="text-neutral-500 text-sm">
            Number: {data.inscription_number}
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-2.5">
          <Badge variant="secondary" className="text-xs">
            Floor: <b>{formatBTC(satToBtc(data.last_sale_price ?? 0))}</b>
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Best:{" "}
            <b>
              {data.bestOfferAmount ? formatBTC(data.bestOfferAmount) : "N/A"}
            </b>
          </Badge>
        </div>

        <Button variant="destructive" onClick={handleCreateOffer}>
          Create offer
        </Button>

        <OfferDialog
          open={open}
          ordinalId={data.inscription_id}
          setOpen={setOpen}
        />
      </CardContent>
    </Card>
  );
}
