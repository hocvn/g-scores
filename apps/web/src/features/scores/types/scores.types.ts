export interface Score {
  sbd: string;
  toan: number | string | null;
  ngu_van: number | string | null;
  ngoai_ngu: number | string | null;
  vat_li: number | string | null;
  hoa_hoc: number | string | null;
  sinh_hoc: number | string | null;
  lich_su: number | string | null;
  dia_li: number | string | null;
  gdcd: number | string | null;
  ma_ngoai_ngu: string | null;
}

export type ScoreSubject = Exclude<
  keyof Score,
  "sbd" | "ma_ngoai_ngu"
>;
