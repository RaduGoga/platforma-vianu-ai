"use client";

import { useEffect } from "react";
import { setLast } from "@/lib/progress";

// Reține în browser că ai deschis lecția asta, pentru „continuă unde ai rămas”.
// Nu randează nimic.
export function RecordVisit({
  code,
  slug,
  title,
}: {
  code: string;
  slug: string;
  title: string;
}) {
  useEffect(() => {
    setLast({ slug, code, title });
  }, [code, slug, title]);

  return null;
}
