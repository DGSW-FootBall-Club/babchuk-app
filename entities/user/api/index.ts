import { api } from "@/shared/lib/api";
import type { BaseResponse } from "@/entities/common/BaseResponse";
import type { UserResponse } from "@/entities/user/types/response/UserResponse";
import type { UpdateUserRequest } from "@/entities/user/types/request/UpdateUserRequest";

export async function getMyInfo(): Promise<UserResponse> {
  const res = await api.get<BaseResponse<UserResponse>>("/user/me");
  return res.data.data;
}

export async function updateMyInfo(
  body: UpdateUserRequest,
): Promise<UserResponse> {
  const res = await api.patch<BaseResponse<UserResponse>>("/user/me", body);
  return res.data.data;
}
