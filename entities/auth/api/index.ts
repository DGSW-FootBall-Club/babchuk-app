import { api } from "@/shared/lib/api";
import type { BaseResponse } from "@/entities/common/BaseResponse";
import type { LoginRequest } from "@/entities/auth/types/request/LoginRequest";
import type { LoginResponse } from "@/entities/auth/types/response/LoginResponse";
import type { SignupRequest } from "@/entities/auth/types/request/SignupRequest";

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<BaseResponse<LoginResponse>>("/auth/login", body);
  return res.data.data;
}

export async function signup(body: SignupRequest): Promise<string> {
  const res = await api.post<BaseResponse<string>>("/auth/signup", body);
  return res.data.data;
}
