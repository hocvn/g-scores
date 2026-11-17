import { api } from "../../../lib/axios";
import type { ScoreSpectrum, Subject } from "../types/dashboard.type";

export const dashboardApi = {
  async getScoreSpectrum(
    subject: Subject,
    signal?: AbortSignal,
  ): Promise<ScoreSpectrum> {
    const response = await api.get<ScoreSpectrum>("/reports/score-spectrum", {
      params: { subject },
      signal,
    });

    return response.data;
  },
};
