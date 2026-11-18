import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { dashboardApi } from "../api/dashboard.api";
import type { Subject } from "../types/dashboard.type";

export function useScoreSpectrum(subject: Subject) {
  return useQuery({
    queryKey: ["dashboard", "score-spectrum", subject],

    queryFn: ({ signal }) => dashboardApi.getScoreSpectrum(subject, signal),

    staleTime: 5 * 60 * 1000,

    retry: (failureCount, error) => {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status < 500
      ) {
        return false;
      }

      return failureCount < 1;
    },
  });
}
