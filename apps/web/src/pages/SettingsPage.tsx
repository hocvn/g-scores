import { Check, Moon, Sun } from "lucide-react";
import { type Theme } from "../components/theme/theme-context";
import { useTheme } from "../components/theme/useTheme";

const themes: { value: Theme; title: string; description: string; icon: typeof Sun }[] = [
  {
    value: "light",
    title: "Light",
    description: "Use the current bright appearance.",
    icon: Sun,
  },
  {
    value: "dark",
    title: "Dark",
    description: "Use a darker interface for lower-light environments.",
    icon: Moon,
  },
];

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
      <p className="mt-1 text-sm text-slate-500">
        Customize the appearance of G-Scores.
      </p>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Appearance</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose the color theme you prefer.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Theme">
          {themes.map(({ value, title, description, icon: Icon }) => {
            const selected = theme === value;

            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setTheme(value)}
                className={`relative flex items-start gap-4 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  selected
                    ? "border-indigo-500 bg-indigo-50 text-indigo-950"
                    : "border-slate-200 text-slate-700 hover:border-indigo-200 hover:bg-slate-50"
                }`}
              >
                <span className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold">{title}</span>
                  <span className="mt-1 block text-sm text-slate-500">{description}</span>
                </span>
                {selected && (
                  <Check
                    className="absolute right-4 top-4 text-indigo-600"
                    size={20}
                    aria-label="Selected"
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
