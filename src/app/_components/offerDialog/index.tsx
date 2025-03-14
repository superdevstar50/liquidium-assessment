"use client";
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
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Offer } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { offerSchema } from "./schema";
import { createOffer } from "@/actions/offers";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

type OfferInputType = Omit<Offer, "id" | "ordinalId">;

export interface OfferDialogProps {
  open: boolean;
  setOpen?: (open: boolean) => void;
  ordinalId: string;
}

export function OfferDialog({ open, ordinalId, setOpen }: OfferDialogProps) {
  const form = useForm<OfferInputType>({
    defaultValues: {
      amount: 0.5,
      interest: 2,
      term: 7,
    },
    resolver: zodResolver(offerSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<OfferInputType> = async (data) => {
    try {
      setLoading(true);
      await createOffer({
        ...data,
        ordinalId,
      });

      setOpen?.(false);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-8">Create a custom request</DialogTitle>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogDescription className="flex flex-col gap-4">
                <OrdinalInfo ordinalId={ordinalId} />
                <OfferForm />
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen?.(false)}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={loading}
                  >
                    {loading && <Spinner />}
                    Create request
                  </Button>
                </div>
              </DialogDescription>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
