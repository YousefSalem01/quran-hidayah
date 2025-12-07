import { useState } from "react";

export function useFaq(defaultActiveId: string | null = null) {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(
    defaultActiveId,
  );

  const toggleFaq = (id: string) => {
    setActiveFaqId((prev) => (prev === id ? null : id));
  };

  return {
    activeFaqId,
    toggleFaq,
  };
}

