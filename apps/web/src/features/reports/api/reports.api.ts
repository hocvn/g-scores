import type {
  SubjectDistribution,
  TopGroupAStudent,
} from "../types/reports.type";

import { api } from "../../../lib/axios";

export const reportsApi = {
  getSubjectDistribution: async (): Promise<SubjectDistribution[]> => {
    const { data } = await api.get<SubjectDistribution[]>(
      `/reports/subject-distribution`,
    );

    return data;
  },

  getTopGroupA: async (): Promise<TopGroupAStudent[]> => {
    const { data } = await api.get<TopGroupAStudent[]>(`/reports/top-group-a`);

    return data;
  },
};
