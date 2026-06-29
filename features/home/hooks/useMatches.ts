import { useQuery } from "@tanstack/react-query";
import { getMatches } from "@/entities/match/api";

export function useMatches() {
  return useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  });
}
