export type Subject =
  | "toan"
  | "ngu_van"
  | "ngoai_ngu"
  | "vat_li"
  | "hoa_hoc"
  | "sinh_hoc"
  | "lich_su"
  | "dia_li"
  | "gdcd";

export type ScoreSpectrumPoint = {
  score: number;
  count: number;
};

export type ScoreSpectrum = {
  subject: Subject;
  total: number;
  points: ScoreSpectrumPoint[];
};
