import { api } from "@/shared/lib/api";
import type { BaseResponse } from "@/entities/common/BaseResponse";
import type {
  MatchListResponse,
  MatchDetailResponse,
} from "@/entities/match/types/response/MatchResponse";
import type { CreateMatchRequest } from "@/entities/match/types/request/CreateMatchRequest";
import type { JoinMatchRequest } from "@/entities/match/types/request/JoinMatchRequest";

// ⛔ 임시: 스켈레톤 확인용 딜레이. 확인 후 이 한 줄 삭제하세요.
const skeletonDelay = () => new Promise((r) => setTimeout(r, 2500));

// 매치 목록 조회: GET /match
export async function getMatches(): Promise<MatchListResponse[]> {
  await skeletonDelay(); // ⛔ 임시: 확인 후 삭제
  const res = await api.get<BaseResponse<MatchListResponse[]>>("/match");
  return res.data.data;
}

// 매치 상세 조회: GET /match/{id}
export async function getMatch(matchId: number): Promise<MatchDetailResponse> {
  await skeletonDelay(); // ⛔ 임시: 확인 후 삭제
  const res = await api.get<BaseResponse<MatchDetailResponse>>(
    `/match/${matchId}`,
  );
  return res.data.data;
}

// 매치 생성: POST /match
export async function createMatch(body: CreateMatchRequest): Promise<string> {
  const res = await api.post<BaseResponse<string>>("/match", body);
  return res.data.data;
}

// 매치 참가: POST /match/{id}/join  (teamType으로 A/B 팀 선택)
export async function joinMatch(
  matchId: number,
  body: JoinMatchRequest,
): Promise<string> {
  const res = await api.post<BaseResponse<string>>(
    `/match/${matchId}/join`,
    body,
  );
  return res.data.data;
}

// 매치 참가 취소: DELETE /match/{id}/cancel
export async function cancelMatch(matchId: number): Promise<string> {
  const res = await api.delete<BaseResponse<string>>(
    `/match/${matchId}/cancel`,
  );
  return res.data.data;
}

// 매치 삭제: DELETE /match/{id}
export async function deleteMatch(matchId: number): Promise<string> {
  const res = await api.delete<BaseResponse<string>>(`/match/${matchId}`);
  return res.data.data;
}

// 내 참가 여부: GET /match/{id}/joined
export async function getIsJoined(matchId: number): Promise<boolean> {
  const res = await api.get<BaseResponse<boolean>>(`/match/${matchId}/joined`);
  return res.data.data;
}
