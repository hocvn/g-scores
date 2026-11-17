import { AlertCircle } from "lucide-react";

interface NotFoundSearchStateProps {
  searchNumber: string;
}

export function NotFoundSearchState({
  searchNumber,
}: NotFoundSearchStateProps) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
      <AlertCircle size={28} className="mx-auto mb-3 text-amber-600" />

      <p className="font-semibold text-amber-900">No results found</p>

      <p className="mt-2 text-sm text-amber-700">
        No examination results were found for registration number{" "}
        <strong>{searchNumber}</strong>.
      </p>
    </div>
  );
}
