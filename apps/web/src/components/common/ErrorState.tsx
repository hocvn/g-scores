import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
    >
      <AlertCircle size={28} className="mx-auto mb-3 text-red-600" />

      <p className="font-semibold text-red-900">{title}</p>

      <p className="mt-2 text-sm text-red-700">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
