import { LoaderCircle } from "lucide-react";

export function LoadingState() {
  return (
    <div
      role="status"
      className="rounded-xl bg-white p-10 text-center shadow-sm"
    >
      <LoaderCircle size={32} className="mb-4 animate-spin text-indigo-600" />
      <p className="text-sm text-slate-500">Loading reports...</p>
    </div>
  );
}
