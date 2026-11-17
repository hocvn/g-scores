import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { reportsApi } from "../api/reports.api";

function retryReport(failureCount: number, error: Error) {
  if (
    axios.isAxiosError(error) &&
    error.response &&
    error.response.status < 500
  ) {
    return false;
  }

  return failureCount < 1;
}

export function useReport() {
  const distributionQuery = useQuery({
    queryKey: ["reports", "subject-distribution"],
    queryFn: () => reportsApi.getSubjectDistribution(),
    retry: retryReport,
  });

  const topGroupAQuery = useQuery({
    queryKey: ["reports", "top-group-a"],
    queryFn: () => reportsApi.getTopGroupA(),
    retry: retryReport,
  });

  async function refetch() {
    await Promise.all([distributionQuery.refetch(), topGroupAQuery.refetch()]);
  }

  return {
    distribution: distributionQuery.data ?? [],
    students: topGroupAQuery.data ?? [],
    isLoading: distributionQuery.isPending || topGroupAQuery.isPending,
    isFetching: distributionQuery.isFetching || topGroupAQuery.isFetching,
    isError: distributionQuery.isError || topGroupAQuery.isError,
    error: distributionQuery.error ?? topGroupAQuery.error,
    refetch,
  };
}
