import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { SearchScoresPage } from "./pages/SearchScoresPage";
import { ReportsPage } from "./pages/ReportsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/scores" element={<SearchScoresPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
