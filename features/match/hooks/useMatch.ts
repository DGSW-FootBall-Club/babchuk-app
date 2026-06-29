import { useQuery } from "@tanstack/react-query";

import { getMatch, getIsJoined } from "@/entities/match/api";

// 매치 상세 조회. queryKey에 id를 넣어 매치별로 캐시 분리.
export function useMatch(matchId: number) {
  return useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatch(matchId),
    enabled: matchId > 0, // 잘못된 id면 호출 안 함
  });
}

// 내가 이 매치에 참가했는지 여부
export function useIsJoined(matchId: number) {
  return useQuery({
    queryKey: ["isJoined", matchId],
    queryFn: () => getIsJoined(matchId),
    enabled: matchId > 0,
  });
}
