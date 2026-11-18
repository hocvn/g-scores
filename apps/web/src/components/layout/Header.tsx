import { useState } from "react";
import { Info, Menu, X } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showServerInfo, setShowServerInfo] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-slate-900">G-Scores</h1>
          <p className="text-xs text-slate-500">Student Examination Results</p>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowServerInfo((previous) => !previous)}
          aria-expanded={showServerInfo}
          aria-controls="server-info"
          className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
        >
          <Info size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Server info</span>
          <span className="sr-only sm:hidden">Server information</span>
        </button>

        {showServerInfo && (
          <div
            id="server-info"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setShowServerInfo(false);
              }
            }}
            className="absolute right-0 top-full mt-3 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:w-80"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">
                First load may take longer
              </p>

              <button
                type="button"
                onClick={() => setShowServerInfo(false)}
                aria-label="Close server information"
                className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              This demo uses Render’s free hosting. After about 15 minutes of
              inactivity, the server goes to sleep. The next request may take a
              little longer while it starts up.
            </p>

            <p className="mt-3 text-xs font-medium text-amber-700">
              Please keep this page open while your data loads.
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
