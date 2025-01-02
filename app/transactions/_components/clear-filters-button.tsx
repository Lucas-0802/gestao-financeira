"use client";

import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";

const ClearFilterButtons = () => {
  const router = useRouter();

  const handleFilterButtons = () => {
    router.push("/transactions");
  };
  return (
    <Button onClick={handleFilterButtons} variant="ghost">
      Limpar Filtros
    </Button>
  );
};

export default ClearFilterButtons;
