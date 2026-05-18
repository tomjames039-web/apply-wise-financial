"use client";

interface LenderBadge {
  name: string;
  brandColor: string;
}

const mainLenders: LenderBadge[] = [
  { name: "NatWest", brandColor: "#5B2D8E" },
  { name: "Nationwide", brandColor: "#004B87" },
  { name: "Barclays", brandColor: "#00AEEF" },
  { name: "Halifax", brandColor: "#004A93" },
  { name: "Santander", brandColor: "#EC0000" },
  { name: "HSBC", brandColor: "#DB0011" },
];

export function LenderBadges() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
      {mainLenders.map((lender) => (
        <div
          key={lender.name}
          className="px-4 py-2 rounded-lg transition-transform duration-200 hover:scale-105"
          style={{ backgroundColor: lender.brandColor }}
        >
          <span className="text-white font-bold text-sm tracking-tight whitespace-nowrap">
            {lender.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export function FCABadgeInlineSimple() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="bg-[#003B5C] rounded px-2 py-0.5">
        <span className="text-white font-bold text-xs tracking-tight">FCA</span>
      </div>
      <span>Regulated</span>
    </div>
  );
}
