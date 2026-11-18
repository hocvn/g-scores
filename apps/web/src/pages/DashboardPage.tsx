import { useState } from "react";
import { Link } from "react-router-dom";

import { ErrorState } from "../components/common/ErrorState";
import { ScoreSpectrumChart } from "../features/dashboard/components/ScoreSpectrumChart";
import { StatCard } from "../features/dashboard/components/StatCard";
import type { Subject } from "../features/dashboard/types/dashboard.type";
import { LoadingState } from "../features/reports/components/LoadingState";
import { numberFormatter, subjectNames } from "../constants/subjects";
import { useReport } from "../features/reports/hooks/useReport";
import { ChevronDown } from "lucide-react";

export function DashboardPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject>("toan");

  const { distribution, isLoading, error, refetch } = useReport();

  const selectedDistribution = distribution.find(
    (item) => item.subject === selectedSubject,
  );

  const subjectName = subjectNames[selectedSubject] ?? selectedSubject;

  const subjectTotal = selectedDistribution
    ? selectedDistribution.excellent +
      selectedDistribution.good +
      selectedDistribution.average +
      selectedDistribution.weak
    : 0;

  const excellentPercentage =
    selectedDistribution && subjectTotal > 0
      ? (selectedDistribution.excellent / subjectTotal) * 100
      : null;

  const weakPercentage =
    selectedDistribution && subjectTotal > 0
      ? (selectedDistribution.weak / subjectTotal) * 100
      : null;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

          <p className="mt-1 text-sm text-slate-500">
            Overview of exam scores by subject.
          </p>
        </div>

        <Link
          to="/scores"
          className="inline-flex items-center justify-center rounded-lg
                     bg-blue-900 px-5 py-2.5 text-sm font-semibold
                     text-white transition-colors hover:bg-blue-800"
        >
          Check grades
        </Link>
      </header>

      <section
        aria-label="Subject selection"
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <label
          htmlFor="dashboard-subject"
          className="text-sm font-medium text-slate-700"
        >
          Subject
        </label>

        <div className="relative w-full sm:w-52">
          <select
            id="dashboard-subject"
            value={selectedSubject}
            onChange={(event) =>
              setSelectedSubject(event.target.value as Subject)
            }
            className="w-full appearance-none rounded-lg border
               border-slate-300 bg-white py-2 pl-3 pr-10
               text-sm text-slate-700
               focus:border-blue-500 focus:outline-none
               focus:ring-2 focus:ring-blue-100"
          >
            {Object.entries(subjectNames).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <ChevronDown
            aria-hidden="true"
            size={16}
            className="pointer-events-none absolute right-3 top-1/2
               -translate-y-1/2 text-slate-500"
          />
        </div>
      </section>

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error.message} onRetry={() => void refetch()} />
      ) : (
        <section
          aria-label="General statistics"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <StatCard
            title={`Candidates — ${subjectName}`}
            value={
              selectedDistribution ? numberFormatter.format(subjectTotal) : "—"
            }
            description="Candidates with a recorded score in this subject"
          />

          <StatCard
            title={`Scores < 4 — ${subjectName}`}
            value={
              weakPercentage !== null
                ? `${numberFormatter.format(
                    Number(weakPercentage.toFixed(1)),
                  )}%`
                : "—"
            }
            description={
              selectedDistribution
                ? `${numberFormatter.format(
                    selectedDistribution.weak,
                  )} candidates scored below 4`
                : "No data available"
            }
          />

          <StatCard
            title={`Scores ≥ 8 — ${subjectName}`}
            value={
              excellentPercentage !== null
                ? `${numberFormatter.format(
                    Number(excellentPercentage.toFixed(1)),
                  )}%`
                : "—"
            }
            description={
              selectedDistribution
                ? `${numberFormatter.format(
                    selectedDistribution.excellent,
                  )} candidates scored 8 or higher`
                : "No data available"
            }
          />
        </section>
      )}

      <ScoreSpectrumChart subject={selectedSubject} />
    </div>
  );
}
