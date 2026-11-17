import { useState } from "react";
import axios from "axios";
import { Search, LoaderCircle } from "lucide-react";

import { useScore } from "../features/scores/hooks/useScore";
import { ScoreDetails } from "../features/scores/components/ScoreDetails";
import { EmptySearchState } from "../features/scores/components/Empty";
import { LoadingSearchState } from "../features/scores/components/Loading";
import { NotFoundSearchState } from "../features/scores/components/NotFound";
import { ErrorState } from "../components/common/ErrorState";

export function SearchScoresPage() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [searchNumber, setSearchNumber] = useState<string | null>(null);

  const {
    data: score,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useScore(searchNumber);

  const isLoading = isFetching;

  const notFound =
    isError && axios.isAxiosError(error) && error.response?.status === 404;

  const errorMessage = axios.isAxiosError(error)
    ? error.response?.status === 500
      ? "Server error. Please try again later."
      : error.code === "ECONNABORTED"
        ? "Request timed out. Please try again."
        : error.response
          ? "Unable to retrieve examination results."
          : "Unable to connect to the server."
    : "An unexpected error occurred.";

  function handleSearch() {
    const value = registrationNumber.trim();

    if (!value || isLoading) return;

    if (value === searchNumber) {
      void refetch();
    } else {
      setSearchNumber(value);
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Search Scores
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Look up examination results using a registration number.
        </p>
      </div>

      {/* Search Form */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
            <Search size={22} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              User Registration
            </h3>
            <p className="text-sm text-slate-500">
              Enter your registration number to view scores.
            </p>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
          className="max-w-2xl"
        >
          <label
            htmlFor="registrationNumber"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Registration Number
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="registrationNumber"
              type="text"
              inputMode="numeric"
              value={registrationNumber}
              onChange={(event) => setRegistrationNumber(event.target.value)}
              placeholder="Enter registration number"
              required
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <button
              type="submit"
              disabled={isLoading || !registrationNumber.trim()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </section>

      {/* Detailed Scores */}
      <section
        aria-live="polite"
        className="min-h-64 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Detailed Scores
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            View detailed examination results.
          </p>
        </div>

        {/* Empty State */}
        {!searchNumber && <EmptySearchState />}

        {/* Loading State */}
        {searchNumber && isPending && isLoading && <LoadingSearchState />}

        {/* Not Found State */}
        {searchNumber && !isLoading && notFound && (
          <NotFoundSearchState searchNumber={searchNumber} />
        )}

        {/* Error State */}
        {searchNumber && !isLoading && isError && !notFound && (
          <ErrorState message={errorMessage} onRetry={() => void refetch()} />
        )}

        {/* Success State */}
        {searchNumber && score && !isError && (
          <>
            {isFetching && (
              <p className="mb-4 text-sm text-indigo-600">
                Updating results...
              </p>
            )}

            <ScoreDetails score={score} />
          </>
        )}
      </section>
    </div>
  );
}
