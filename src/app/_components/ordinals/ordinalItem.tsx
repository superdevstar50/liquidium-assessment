import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function OrdinalItem() {
  return (
    <Card className="p-0">
      <CardContent className="p-4 flex flex-col gap-3 md:min-w-52 min-w-44">
        <div className="flex justify-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://bis-ord-renders.fra1.cdn.digitaloceanspaces.com/renders/d51acc6377ec4ccc14cf6b4cf0a695c7be055b3ba065760bff60de55bdfb8fbei0.png" />
          </Avatar>
        </div>

        <div>
          <div className="font-semibold text-xl">Quantum Cats</div>
          <div className="text-neutral-500 text-sm">Name: #4345</div>
          <div className="text-neutral-500 text-sm">ID: 627ae...1di0</div>
          <div className="text-neutral-500 text-sm">Number: 53786861</div>
        </div>
        <div className="flex md:flex-row flex-col gap-2.5">
          <Badge variant="secondary" className="text-xs">
            Floor: <b>₿0.3223</b>
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Best: <b>₿0.2223</b>
          </Badge>
        </div>

        <Button variant="destructive">Create offer</Button>
      </CardContent>
    </Card>
  );
}
