import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrdinalInfo } from "./ordinalInfo";
import { OfferForm } from "./offerForm";
import { Button } from "@/components/ui/button";

export function OfferDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-8">Create a custom request</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            <OrdinalInfo />
            <OfferForm />
            <div className="flex justify-between">
              <Button variant="outline">Close</Button>
              <Button variant="destructive">Create request</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
