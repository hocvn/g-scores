import { LoaderCircle } from "lucide-react";

export function LoadingSearchState() {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center py-10"
    >
      <LoaderCircle size={32} className="mb-4 animate-spin text-indigo-600" />
      <p className="text-sm text-slate-500">
        Searching for examination results...
      </p>
    </div>
  );
}
