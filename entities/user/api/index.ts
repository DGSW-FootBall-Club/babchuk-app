import { api } from "@/shared/lib/api";
import type { BaseResponse } from "@/entities/common/BaseResponse";
import type { UserResponse } from "@/entities/user/types/response/UserResponse";

export async function getMyInfo(): Promise<UserResponse> {
  const res = await api.get<BaseResponse<UserResponse>>("/user/me");
  return res.data.data;
}
