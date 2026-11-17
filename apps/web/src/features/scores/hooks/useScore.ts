import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { scoresApi } from "../api/scores.api";

export function useScore(sbd: string | null) {
  return useQuery({
    queryKey: ["scores", sbd],

    queryFn: () => scoresApi.getBySbd(sbd!),

    enabled: Boolean(sbd),

    staleTime: 5 * 60 * 1000, // 5 minnutes

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
