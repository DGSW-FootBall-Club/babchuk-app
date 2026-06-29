import { useQuery } from "@tanstack/react-query";

import { getMyInfo } from "@/entities/user/api";

export function useMyInfo() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMyInfo,
  });
}