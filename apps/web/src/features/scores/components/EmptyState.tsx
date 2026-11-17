import { ClipboardList } from "lucide-react";

export function EmptySearchState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-4">
        <ClipboardList size={28} className="text-slate-400" />
      </div>

      <p className="font-medium text-slate-700">No scores to display</p>

      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Enter a registration number above to search for examination results.
      </p>
    </div>
  );
}
