"use client";
import {
  Dialog,
  DialogContent,
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
import { createOffer, updateOffer } from "@/actions/offers";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { fetchOrdinal } from "@/actions/ordinals";
import { mapCollectionFloor } from "@/actions/utils";
import { OrdinalWithFloor } from "@/types";

type OfferInputType = Omit<Offer, "id" | "ordinalId">;

export interface OfferDialogProps {
  open: boolean;
  setOpen?: (open: boolean) => void;
  ordinalId: string;
  offer?: Offer;
}

export function OfferDialog({
  open,
  ordinalId,
  setOpen,
  offer,
}: OfferDialogProps) {
  const isEditing = !!offer;

  const form = useForm<OfferInputType>({
    defaultValues: offer ?? {
      amount: 0.5,
      interest: 2,
      term: 7,
    },
    resolver: zodResolver(offerSchema),
  });

  const [loading, setLoading] = useState(false);

  const [ordinal, setOrdinal] = useState<OrdinalWithFloor>();

  useEffect(() => {
    if (!open) {
      setOrdinal(undefined);
      return;
    }

    fetchOrdinal({ id: ordinalId }).then((ordinal) => {
      if (!ordinal) {
        return;
      }
      mapCollectionFloor([ordinal]).then((ordinals) => {
        setOrdinal(ordinals[0]);
      });
    });
  }, [ordinalId, open]);

  const onSubmit: SubmitHandler<OfferInputType> = async (data) => {
    if (!ordinal) {
      return;
    }

    if (ordinal.floorAmount && data.amount > ordinal.floorAmount) {
      form.setError("amount", {
        message: `Amount should be lower than floor price. Floor price: ${ordinal.floorAmount}`,
      });
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        updateOffer({
          ...data,
          id: offer.id,
        });
      } else {
        await createOffer({
          ...data,
          ordinalId,
        });
      }

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
          <DialogTitle className="pb-8">
            {isEditing ? "Edit custom request" : "Create a custom request"}
          </DialogTitle>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
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
                    {isEditing ? "Edit request" : "Create request"}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
