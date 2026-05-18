import Image from "next/image";

interface Lender {
  name: string;
  logo: string;
}

const lenders: Lender[] = [
  { name: "NatWest", logo: "/logos/natwest.png" },
  { name: "Nationwide", logo: "/logos/nationwide.png" },
  { name: "Barclays", logo: "/logos/barclays.png" },
  { name: "Halifax", logo: "/logos/halifax.png" },
  { name: "Santander", logo: "/logos/santander.png" },
  { name: "HSBC", logo: "/logos/hsbc.png" },
  { name: "Lloyds", logo: "/logos/lloyds.png" },
  { name: "TSB", logo: "/logos/tsb.png" },
  { name: "Virgin Money", logo: "/logos/virgin-money.png" },
  { name: "Metro Bank", logo: "/logos/metro-bank.png" },
  { name: "Yorkshire BS", logo: "/logos/yorkshire-bs.png" },
  { name: "Coventry BS", logo: "/logos/coventry-bs.png" },
  { name: "Skipton BS", logo: "/logos/skipton-bs.png" },
  { name: "Leeds BS", logo: "/logos/leeds-bs.png" },
];

function LenderLogo({ lender }: { lender: Lender }) {
  return (
    <div
      className="flex-shrink-0 border border-navy/10 rounded-lg py-3 px-5 min-w-[140px] h-[60px] flex items-center justify-center transition-all duration-300 bg-white hover:shadow-md group"
    >
      <Image
        src={lender.logo}
        alt={lender.name}
        loading="lazy"
        width={100}
        height={40}
        className="max-h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

export function TrustedPartners() {
  return (
    <section className="py-16 md:py-20 bg-pearl-texture overflow-hidden border-t border-navy/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-3">
            Whole of Market Access
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-navy tracking-tight">
            90+ UK Lenders
          </h2>
        </div>

        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-pearl to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-pearl to-transparent z-10 pointer-events-none" />

          {/* CSS-animated scrolling container - no JavaScript re-renders */}
          <div className="overflow-hidden">
            <div
              className="flex gap-4 items-center animate-scroll-lenders"
              style={{
                width: "fit-content",
              }}
            >
              {/* Duplicate lenders 3x for seamless loop */}
              {[...lenders, ...lenders, ...lenders].map((lender, index) => (
                <LenderLogo key={`${lender.name}-${index}`} lender={lender} />
              ))}
            </div>
          </div>
        </div>

        {/* FCA Logo and Trust Indicator */}
        <div className="flex flex-col items-center mt-12 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logos/fca.png"
                alt="FCA Regulated"
                loading="lazy"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-navy/70 text-sm font-medium">Regulated</span>
            </div>
            <div className="h-8 w-px bg-navy/10" />
            <span className="text-navy/50 text-sm font-medium">FCA Regulated Broker</span>
          </div>
          <p className="text-navy/40 text-sm">
            High street banks, building societies, and specialist lenders
          </p>
        </div>
      </div>
    </section>
  );
}
