import { api } from "@/shared/lib/api";
import type { BaseResponse } from "@/entities/common/BaseResponse";
import type { MatchListResponse } from "@/entities/match/types/response/MatchResponse";

// 매치 목록 조회: GET /match -> 매치 배열
// (서버 응답은 { data: MatchListResponse[] } 형태라 res.data.data 로 꺼냄)
export async function getMatches(): Promise<MatchListResponse[]> {
  const res = await api.get<BaseResponse<MatchListResponse[]>>("/match");
  return res.data.data;
}
