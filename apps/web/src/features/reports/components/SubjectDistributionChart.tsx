import {
  numberFormatter,
  scoreLevels,
  subjectNames,
} from "../constants/constants";
import type { SubjectDistribution } from "../types/reports.type";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

type SubjectDistributionChartProps = {
  data: SubjectDistribution[];
};

export function SubjectDistributionChart({
  data,
}: SubjectDistributionChartProps) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-slate-900">
        Score distribution by subject
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        The length of each segment represents the number of candidates who
        achieved that score level.
      </p>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
        {scoreLevels.map((level) => (
          <div
            key={level.key}
            className="flex items-center gap-2 text-sm text-slate-600"
          >
            <span
              aria-hidden="true"
              className={`size-3 rounded-sm ${level.color}`}
            />
            {level.label}
          </div>
        ))}
      </div>

      {data.length === 0 ? (
        <p className="py-10 text-center text-slate-500">
          No score distribution data is available.
        </p>
      ) : (
        <div>
          <ResponsiveContainer width="100%" height={480} className="py-4">
            <BarChart data={data}>
              <XAxis
                dataKey="subject"
                tickFormatter={(value: string) => subjectNames[value] ?? value}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                width={60}
                tick={{ fontSize: 12 }}
                tickFormatter={(value: number) => numberFormatter.format(value)}
                allowDecimals={false}
              />
              <Tooltip
                labelFormatter={(value) =>
                  subjectNames[String(value)] ?? String(value)
                }
              />

              <Bar dataKey="excellent" stackId="scores" fill="#10b981" />
              <Bar dataKey="good" stackId="scores" fill="#3b82f6" />
              <Bar dataKey="average" stackId="scores" fill="#fbbf24" />
              <Bar dataKey="weak" stackId="scores" fill="#f43f5e" />
            </BarChart>
          </ResponsiveContainer>
          <details className="mt-6 border-t border-slate-100 pt-4">
            <summary className="cursor-pointer text-sm font-medium text-blue-700">
              View details
            </summary>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Number of candidates by score level for each subject
                </caption>

                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th scope="col" className="p-3">
                      Subjects
                    </th>

                    {scoreLevels.map((level) => (
                      <th
                        key={level.key}
                        scope="col"
                        className="whitespace-nowrap p-3 text-right"
                      >
                        {level.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {data.map((row) => (
                    <tr key={row.subject}>
                      <th
                        scope="row"
                        className="whitespace-nowrap p-3 font-medium"
                      >
                        {subjectNames[row.subject] ?? row.subject}
                      </th>

                      {scoreLevels.map((level) => (
                        <td
                          key={level.key}
                          className="p-3 text-right tabular-nums"
                        >
                          {numberFormatter.format(row[level.key])}
                        </td>
                      ))}
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
