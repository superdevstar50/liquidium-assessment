import { NumberInput } from "@/components/formInputs/numberInput";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ONE_BTC_IN_USD } from "@/consts";
import { calculateAPRandAPY, formatBTC, formatUSD } from "@/utils";
import { Check, Info } from "lucide-react";
import { useWatch } from "react-hook-form";

const userBalance = 0.2132;

export function OfferForm() {
  const amount = useWatch({ name: "amount" });
  const interest = useWatch({ name: "interest" });
  const term = useWatch({ name: "term" });

  const { apr, apy } = calculateAPRandAPY(interest, term);

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
            min: 1,
            endIcon: <Badge variant="secondary">Days</Badge>,
            wrapperClassName: "pr-1 py-1 md:max-w-40 max-w-20",
          }}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="amount">
          Amount <Check size={12} />
        </Label>
        <div className="flex justify-between items-start">
          <NumberInput
            name="amount"
            inputProps={{
              id: "amount",
              type: "number",
              step: 0.000001,
              min: 0,
              endIcon: <Badge variant="secondary">₿</Badge>,
              wrapperClassName: "pr-1 py-1 md:max-w-40 max-w-20",
            }}
            rightContent={<div>{formatUSD(amount * ONE_BTC_IN_USD)}</div>}
          />
          <Badge variant="secondary">Bal: {formatBTC(userBalance)}</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="interest">
          Interest <Check size={12} />
        </Label>
        <div className="flex justify-between items-start">
          <NumberInput
            name="interest"
            inputProps={{
              id: "interest",
              type: "number",
              min: 0,
              endIcon: <Badge variant="secondary">%</Badge>,
              wrapperClassName: "pr-1 py-1 md:max-w-40 max-w-20",
            }}
            rightContent={
              <div>
                {formatBTC((interest / 100) * amount)} |{" "}
                {formatUSD((interest / 100) * amount * ONE_BTC_IN_USD)}
              </div>
            }
          />
          <Badge variant="destructive">
            <div>
              {apy}% APY
              <Separator />
              {apr}% APR
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
