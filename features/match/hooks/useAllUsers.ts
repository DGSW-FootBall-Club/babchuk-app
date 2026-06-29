import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/entities/user/api";

// 전체 유저 목록 (매치 생성 시 주장 선택용)
export function useAllUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
}
