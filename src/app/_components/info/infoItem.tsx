import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ONE_BTC_IN_USD } from "@/consts";

export interface InfoItemProps {
  title: string;
  amount: number;
}

export function InfoItem({ title, amount }: InfoItemProps) {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="text-base leading-9 font-medium">{title}</div>
        <div className="text-3xl leading-11 font-semibold flex items-center gap-2.5">
          ₿{amount}
          <Badge variant="secondary" className="text-base">
            ${amount * ONE_BTC_IN_USD}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
