import { api } from "../../../lib/axios";
import type { Score } from "../types/scores.types";

export const scoresApi = {
  getBySbd: async (sbd: string): Promise<Score> => {
    const { data } = await api.get<Score>(
      `/scores/${encodeURIComponent(sbd)}`
    );

    return data;
  },
};
