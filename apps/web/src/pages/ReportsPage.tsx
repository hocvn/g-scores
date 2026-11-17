import { ErrorState } from "../components/common/ErrorState";
import { LoadingState } from "../features/reports/components/LoadingState";
import { SubjectDistributionChart } from "../features/reports/components/SubjectDistributionChart";
import { TopGroupATable } from "../features/reports/components/TopGroupATable";
import { useReport } from "../features/reports/hooks/useReport";

export function ReportsPage() {
  const { distribution, students, isLoading, error, refetch } = useReport();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="mt-1 text-sm text-slate-500">
          Score distribution by subject and the top 10 candidates for Group A.
        </p>
      </header>

      {isLoading ? (
        <LoadingState />
      ) : error !== null ? (
        <ErrorState message={error.message} onRetry={refetch} />
      ) : (
        <>
          <SubjectDistributionChart data={distribution} />
          <TopGroupATable students={students} />
        </>
      )}
    </div>
  );
}
