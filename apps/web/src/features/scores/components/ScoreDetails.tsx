import { GraduationCap, BookOpen } from "lucide-react";
import type { Score, ScoreSubject, } from "../types/scores.types";

interface ScoreDetailsProps {
  score: Score;
}

const subjects: {
  key: ScoreSubject;
  label: string;
}[] = [
  { key: "toan", label: "Mathematics" },
  { key: "ngu_van", label: "Literature" },
  { key: "ngoai_ngu", label: "Foreign Language" },
  { key: "vat_li", label: "Physics" },
  { key: "hoa_hoc", label: "Chemistry" },
  { key: "sinh_hoc", label: "Biology" },
  { key: "lich_su", label: "History" },
  { key: "dia_li", label: "Geography" },
  { key: "gdcd", label: "Civic Education" },
];

function formatScore(value: number | string | null): string {
  if (value === null || value === "") {
    return "—";
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString("vi-VN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    : "—";
}

export function ScoreDetails({ score }: ScoreDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Registration Information */}
      <div className="flex items-center gap-4 rounded-xl border border-indigo-100 bg-indigo-50 p-5">
        <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
          <GraduationCap size={24} />
        </div>

        <div>
          <p className="text-sm font-medium text-indigo-600">
            Registration Number
          </p>
          <p className="mt-1 text-xl font-bold text-indigo-950">
            {score.sbd}
          </p>
        </div>
      </div>

      {/* Scores Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 py-4">
          <BookOpen size={18} className="text-indigo-600" />
          <h4 className="font-semibold text-slate-900">
            Subject Scores
          </h4>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-3 font-medium">
                Subject
              </th>
              <th className="px-5 py-3 text-right font-medium">
                Score
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {subjects.map(({ key, label }) => (
              <tr
                key={key}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="px-5 py-4 text-slate-700">
                  {label}
                </td>

                <td className="px-5 py-4 text-right font-semibold tabular-nums text-slate-900">
                  {formatScore(score[key])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Foreign Language Code */}
      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-5 py-4">
        <span className="text-sm font-medium text-slate-600">
          Foreign Language Code
        </span>

        <span className="text-sm font-semibold text-slate-900">
          {score.ma_ngoai_ngu ?? "—"}
        </span>
      </div>

      <p className="text-xs text-slate-400">
        — indicates that no score is available for this subject.
      </p>
    </div>
  );
}
