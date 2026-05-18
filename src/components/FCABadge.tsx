"use client";

interface FCABadgeProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function FCABadge({ size = "md", showText = true, className = "" }: FCABadgeProps) {
  const sizes = {
    sm: { height: "h-4", text: "text-xs" },
    md: { height: "h-5", text: "text-sm" },
    lg: { height: "h-6", text: "text-base" },
  };

  const { height, text } = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${height} flex items-center`}>
        <svg
          viewBox="0 0 100 40"
          className={`${height} w-auto`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* FCA Logo stylized */}
          <rect width="100" height="40" rx="4" fill="#003B5C" />
          <text
            x="50"
            y="25"
            textAnchor="middle"
            fill="white"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            fontSize="16"
          >
            FCA
          </text>
        </svg>
      </div>
      {showText && (
        <span className={`${text} font-medium text-navy/80`}>Regulated</span>
      )}
    </div>
  );
}

export function FCABadgeInline({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="inline-flex items-center justify-center h-4 px-1.5 text-[10px] font-bold bg-[#003B5C] text-white rounded">
        FCA
      </span>
      <span className="text-sm font-medium">Regulated</span>
    </span>
  );
}
