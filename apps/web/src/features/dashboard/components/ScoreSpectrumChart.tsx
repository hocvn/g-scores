import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  numberFormatter,
  scoreFormatter,
  subjectNames,
} from "../../../constants/subjects";
import { useScoreSpectrum } from "../hooks/useScoreSpectrum";
import type { Subject } from "../types/dashboard.type";
import { LoaderCircle } from "lucide-react";

type ScoreSpectrumChartProps = {
  subject: Subject;
};

export function ScoreSpectrumChart({ subject }: ScoreSpectrumChartProps) {
  const { data, isPending, isError, refetch } = useScoreSpectrum(subject);

  return (
    <section className="min-w-0 rounded-xl bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-slate-900">
        Score Distribution — {subjectNames[subject] ?? subject}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {data
          ? `${numberFormatter.format(data.total)} candidates with recorded scores`
          : "Number of candidates at each score"}
      </p>

      {isPending ? (
        <div
          role="status"
          className="flex h-42 flex-col items-center justify-center gap-3 text-center"
        >
          <LoaderCircle
            size={32}
            aria-hidden="true"
            className="animate-spin text-indigo-600"
          />
          <p className="text-sm text-slate-500">
            Loading score distribution...
          </p>
        </div>
      ) : isError ? (
        <div role="alert" className="py-12 text-center">
          <p className="text-red-600">Unable to load score distribution.</p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-3 rounded-lg bg-blue-900 px-4 py-2
                       text-sm font-medium text-white hover:bg-blue-800"
          >
            Try again
          </button>
        </div>
      ) : !data || data.points.length === 0 ? (
        <p className="py-12 text-center text-slate-500">
          No score distribution data available for this subject.
        </p>
      ) : (
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={data.points}
              margin={{
                top: 12,
                right: 20,
                left: 4,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="score"
                type="number"
                domain={[0, 10]}
                ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                tick={{ fontSize: 12 }}
                tickMargin={8}
                label={{
                  value: "Score",
                  position: "insideBottomRight",
                  offset: -12,
                }}
              />

              <YAxis
                width={85}
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value: number) => numberFormatter.format(value)}
              />

              <Tooltip
                cursor={{ fill: "#eff6ff" }}
                labelFormatter={(value) =>
                  `Score: ${scoreFormatter.format(Number(value))}`
                }
                formatter={(value) => [
                  `${numberFormatter.format(Number(value))} candidates`,
                  "Count",
                ]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                }}
              />

              <Bar
                dataKey="count"
                name="Candidates"
                fill="#2563eb"
                maxBarSize={12}
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <details className="mt-4 border-t border-slate-100 pt-4">
            <summary className="cursor-pointer text-sm font-medium text-blue-700">
              View detailed data
            </summary>

            <div className="mt-3 max-h-64 overflow-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Score distribution for {subjectNames[subject]}
                </caption>

                <thead className="sticky top-0 bg-slate-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Score
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Candidates
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {data.points.map((point) => (
                    <tr key={point.score}>
                      <th scope="row" className="px-4 py-2 font-medium">
                        {scoreFormatter.format(point.score)}
                      </th>

                      <td className="px-4 py-2 text-right tabular-nums">
                        {numberFormatter.format(point.count)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      )}
    </section>
  );
}
