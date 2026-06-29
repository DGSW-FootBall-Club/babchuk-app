import { api } from "@/shared/lib/api";
import type { BaseResponse } from "@/entities/common/BaseResponse";
import type { UserResponse } from "@/entities/user/types/response/UserResponse";
import type { UpdateUserRequest } from "@/entities/user/types/request/UpdateUserRequest";

export async function getMyInfo(): Promise<UserResponse> {
  const res = await api.get<BaseResponse<UserResponse>>("/user/me");
  return res.data.data;
}

// 전체 유저 목록: GET /user/all (매치 주장 선택 등에 사용)
export async function getAllUsers(): Promise<UserResponse[]> {
  await new Promise((r) => setTimeout(r, 2500)); // ⛔ 임시: 스켈레톤 확인용, 확인 후 삭제
  const res = await api.get<BaseResponse<UserResponse[]>>("/user/all");
  return res.data.data;
}

export async function updateMyInfo(
  body: UpdateUserRequest,
): Promise<UserResponse> {
  const res = await api.patch<BaseResponse<UserResponse>>("/user/me", body);
  return res.data.data;
}
