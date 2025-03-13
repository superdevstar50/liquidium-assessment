import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, Info } from "lucide-react";

export function OfferForm() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="term">
          Email <Check size={12} />
        </Label>
        <Input type="number" id="term" className="max-w-40" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="amount">
          Amount <Check size={12} />
        </Label>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Input type="number" id="amount" className="max-w-40" />
            <div>$19115.58</div>
          </div>
          <Badge variant="secondary">Bal: ₿0.00391</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="teinterestrm">
          Interest <Check size={12} />
        </Label>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Input type="number" id="interest" className="max-w-40" />
            <div>₿0.032 | $3115.58</div>
          </div>
          <Badge variant="destructive">
            <div>
              181% APY
              <Separator />
              104% APR
            </div>
          </Badge>
        </div>
      </div>
      <Badge variant="secondary" className="w-full py-2 flex justify-start">
        <Info />
        If the borrower fails to repay, the loan defaults.
      </Badge>
    </div>
  );
}
