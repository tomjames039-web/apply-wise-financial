"use client";

import { useEffect, Suspense, lazy } from "react";

// Lazy load non-critical components
const ChatWidget = lazy(() => import("@/components/ChatWidget").then(mod => ({ default: mod.ChatWidget })));

export function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.className = "antialiased";
  }, []);

  return (
    <body className="antialiased">
      {children}
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </body>
  );
}
