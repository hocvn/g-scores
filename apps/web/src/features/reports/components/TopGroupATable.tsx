import { scoreFormatter } from "../../../constants/subjects";
import type { TopGroupAStudent } from "../types/reports.type";

type TopGroupATableProps = {
  students: TopGroupAStudent[];
};

export function TopGroupATable({ students }: TopGroupATableProps) {
  const topStudents = [...students]
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-900">
          Top 10 candidates in the Group A
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Ranked by the total score in Mathematics, Physics, and Chemistry.
        </p>
      </div>

      {topStudents.length === 0 ? (
        <p className="px-6 pb-10 text-center text-slate-500">
          No ranking data available.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-sm">
            <caption className="sr-only">
              Top 10 candidates with the highest total scores for Group A
              subjects
            </caption>

            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Ranking
                </th>
                <th scope="col" className="px-6 py-4">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Mathematics
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Physics
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Chemistry
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Total score
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {topStudents.map((student, index) => (
                <tr key={student.sbd} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex size-8 items-center justify-center rounded-full font-bold ${
                        index < 3
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>

                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-slate-900"
                  >
                    {student.sbd}
                  </th>

                  <td className="px-6 py-4 text-right tabular-nums">
                    {scoreFormatter.format(student.toan)}
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums">
                    {scoreFormatter.format(student.vat_li)}
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums">
                    {scoreFormatter.format(student.hoa_hoc)}
                  </td>
                  <td className="px-6 py-4 text-right font-bold tabular-nums text-blue-700">
                    {scoreFormatter.format(student.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
