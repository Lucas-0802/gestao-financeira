"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const MONTH_OPTIONS = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const YEAR_OPTIONS = Array.from(
  { length: 10 },
  (_, index) => new Date().getFullYear() - index,
).map((year) => ({ value: year.toString(), label: year.toString() }));

interface TimeSelectProps {
  page: string;
}

const TimeSelect = ({ page }: TimeSelectProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Atualiza o estado inicial com base nos parâmetros da URL
  useEffect(() => {
    const initialMonth = searchParams.get("month") || "";
    const initialYear = searchParams.get("year") || "";
    setSelectedMonth(initialMonth);
    setSelectedYear(initialYear);
  }, [searchParams]);

  const handleChange = (month: string, year: string) => {
    if (month && year) {
      const path =
        page === "transactions"
          ? `/transactions?month=${month}&year=${year}`
          : `/?month=${month}&year=${year}`;

      push(path);
    }
  };

  return (
    <div className="flex space-x-4">
      {/* Month Selector */}
      <Select
        onValueChange={(value) => {
          setSelectedMonth(value);
          handleChange(value, selectedYear);
        }}
        value={selectedMonth}
      >
        <SelectTrigger className="w-[150px] rounded-full">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          {MONTH_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year Selector */}
      <Select
        onValueChange={(value) => {
          setSelectedYear(value);
          handleChange(selectedMonth, value);
        }}
        value={selectedYear}
      >
        <SelectTrigger className="w-[150px] rounded-full">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          {YEAR_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelect;
