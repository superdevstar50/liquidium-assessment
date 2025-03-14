"use client";
import { deleteOffer } from "@/actions/offers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { OfferWithOrdinal } from "@/types";
import { formatBTC } from "@/utils";
import { Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { OfferDialog } from "../offerDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export interface OfferItemProps {
  data: OfferWithOrdinal;
}

export function OfferItem({ data }: OfferItemProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  if (!data.ordinal) {
    return;
  }

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteOffer({ id: data.id });
      toast.success("Successfully deleted");
    } catch {
      toast.success("Error occured while deleting");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setOpen(true);
  };

  return (
    <div className="flex justify-between items-center gap-2.5 p-2.5 rounded-md md:rounded-full bg-[#191919]">
      <div className="flex flex-col md:flex-row items-center gap-2.5">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={
              data.ordinal.render_url ??
              `https://bis-ord-content.fra1.cdn.digitaloceanspaces.com/ordinals/${data.ordinal.inscription_id}`
            }
          />
          <AvatarFallback />
        </Avatar>

        <div className="font-semibold">
          {data.ordinal.collection_name}{" "}
          <span className="font-normal">{data.ordinal.inscription_name}</span>
        </div>
        <div>
          <Badge className="text-xs" variant="secondary">
            Offer:{" "}
            <span className="font-semibold">{formatBTC(data.amount)}</span>
          </Badge>
          <Badge className="text-xs" variant="secondary">
            Floor:{" "}
            <span className="font-semibold">
              {data.ordinal.floorAmount
                ? formatBTC(data.ordinal.floorAmount)
                : "N/A"}
            </span>
          </Badge>
          <Badge className="text-xs" variant="secondary">
            LTV:{" "}
            <span className="font-semibold">
              {data.ordinal.floorAmount
                ? `${Math.floor(
                    (data.amount * 100) / data.ordinal.floorAmount
                  )}%`
                : "N/A"}{" "}
            </span>
          </Badge>
          <Badge className="text-xs" variant="secondary">
            Days: <span className="font-semibold">{data.term}</span>
          </Badge>
          <Badge className="text-xs" variant="secondary">
            Interest: <span className="font-semibold">{data.interest}%</span>
          </Badge>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2.5">
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={handleEdit}
        >
          <Pen />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="rounded-full"
              disabled={loading}
            >
              {loading ? <Spinner /> : <Trash2 />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                offer and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <OfferDialog
        open={open}
        setOpen={setOpen}
        ordinalId={data.ordinalId}
        offer={data}
      />
    </div>
  );
}
