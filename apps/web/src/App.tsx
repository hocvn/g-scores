import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { SearchScoresPage } from "./pages/SearchScoresPage";
import { ReportsPage } from "./pages/ReportsPage";
import { DashboardPage } from "./pages/DashboardPage";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-slate-500">This page is under development.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/scores" element={<SearchScoresPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route
          path="/settings"
          element={<PlaceholderPage title="Settings" />}
        />
      </Route>
    </Routes>
  );
}
