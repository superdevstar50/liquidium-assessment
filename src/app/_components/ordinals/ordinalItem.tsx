import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ordinal } from "@/types";
import { formatBTC, formatInscriptionId, satToBtc } from "@/utils";

export interface OrdinalItemProps {
  data: Ordinal;
}

export function OrdinalItem({ data }: OrdinalItemProps) {
  return (
    <Card className="p-0">
      <CardContent className="p-4 flex flex-col gap-3 md:min-w-60 md:max-w-60 min-w-44 max-w-44">
        {data.render_url && (
          <div className="flex justify-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={data.render_url} />
            </Avatar>
          </div>
        )}

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
            Best: <b>N/A</b>
          </Badge>
        </div>

        <Button variant="destructive">Create offer</Button>
      </CardContent>
    </Card>
  );
}
