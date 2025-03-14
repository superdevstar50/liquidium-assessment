import { NumberInput } from "@/components/formInputs/numberInput";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ONE_BTC_IN_USD } from "@/consts";
import { formatBTC, formatUSD } from "@/utils";
import { Check, Info } from "lucide-react";
import { useWatch } from "react-hook-form";

const userBalance = 0.2132;

export function OfferForm() {
  const amount = useWatch({ name: "amount" });
  const interest = useWatch({ name: "interest" });

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="term">
          Term <Check size={12} />
        </Label>
        <NumberInput
          name="term"
          inputProps={{
            id: "term",
            type: "number",
            className: "max-w-40",
            min: 1,
          }}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="amount">
          Amount <Check size={12} />
        </Label>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <NumberInput
              name="amount"
              inputProps={{
                id: "amount",
                type: "number",
                className: "max-w-40",
                step: 0.000001,
                min: 0,
              }}
            />

            <div>{formatUSD(amount * ONE_BTC_IN_USD)}</div>
          </div>
          <Badge variant="secondary">Bal: {formatBTC(userBalance)}</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="interest">
          Interest <Check size={12} />
        </Label>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <NumberInput
              name="interest"
              inputProps={{
                id: "interest",
                type: "number",
                className: "max-w-40",
                min: 0,
              }}
            />
            <div>
              {formatBTC((interest / 100) * amount)} |{" "}
              {formatUSD((interest / 100) * amount * ONE_BTC_IN_USD)}
            </div>
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
