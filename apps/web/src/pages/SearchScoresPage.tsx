import { useState, type FormEvent } from "react";
import { Search, ClipboardList, LoaderCircle } from "lucide-react";

export function SearchScoresPage() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [submittedNumber, setSubmittedNumber] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = registrationNumber.trim();
    if (!value) return;

    setLoading(true);
    setSubmittedNumber("");

    // TODO: Integrate backend scores API.
    setSubmittedNumber(value);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Search Scores
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Look up examination results using a registration number.
        </p>
      </div>

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

        <form onSubmit={handleSubmit} className="max-w-2xl">
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
              onChange={(event) =>
                setRegistrationNumber(event.target.value)
              }
              placeholder="Enter registration number"
              required
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
              Search
            </button>
          </div>
        </form>
      </section>

      <section className="min-h-64 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Detailed Scores
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            View detailed examination results.
          </p>
        </div>

        {submittedNumber ? (
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
            <p className="text-sm text-indigo-700">
              Registration Number
            </p>
            <p className="mt-1 text-lg font-semibold text-indigo-950">
              {submittedNumber}
            </p>
            <p className="mt-3 text-sm text-indigo-700">
              Score lookup API integration is pending.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-4">
              <ClipboardList size={28} className="text-slate-400" />
            </div>
            <p className="font-medium text-slate-700">
              No scores to display
            </p>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Enter a registration number above to search for examination results.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
