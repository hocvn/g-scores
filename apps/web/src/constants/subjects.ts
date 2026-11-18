export const subjectNames: Record<string, string> = {
  toan: "Mathematics",
  ngu_van: "Literature",
  ngoai_ngu: "Foreign Language",
  vat_li: "Physics",
  hoa_hoc: "Chemistry",
  sinh_hoc: "Biology",
  lich_su: "History",
  dia_li: "Geography",
  gdcd: "Civic Education",
};

export const scoreLevels = [
  {
    key: "excellent",
    label: "score ≥ 8",
    color: "bg-emerald-500",
  },
  {
    key: "good",
    label: "6 ≤ score < 8",
    color: "bg-blue-500",
  },
  {
    key: "average",
    label: "4 ≤ score < 6",
    color: "bg-amber-400",
  },
  {
    key: "weak",
    label: "score < 4",
    color: "bg-rose-500",
  },
] as const;

export const numberFormatter = new Intl.NumberFormat("vi-VN");

export const scoreFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 2,
});
