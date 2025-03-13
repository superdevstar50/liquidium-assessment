import { InfoItem } from "./infoItem";

export function Info() {
  return (
    <div className="flex flex-col md:flex-row gap-2.5">
      {[
        { title: "Total portfolio value", amount: 0.932223 },
        { title: "Available liquidity", amount: 0.67773 },
      ].map((infoData) => (
        <InfoItem key={infoData.title} {...infoData} />
      ))}
    </div>
  );
}
