import { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";

import { joinMatch, cancelMatch, deleteMatch } from "@/entities/match/api";

type TeamType = "TEAM_A" | "TEAM_B";

// 매치 상세에서 쓰는 행동들(참가/취소/삭제). 성공하면 관련 캐시를 모두 갱신.
export function useMatchActions(matchId: number) {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // 이 매치/목록/참가여부 캐시를 한 번에 무효화 → 화면 자동 갱신
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["match", matchId] });
    queryClient.invalidateQueries({ queryKey: ["matches"] });
    queryClient.invalidateQueries({ queryKey: ["isJoined", matchId] });
  };

  // 공통 실행 래퍼: 로딩/에러 처리를 한 곳에서
  const run = async (
    fn: () => Promise<unknown>,
    failMessage: string,
    after?: () => void,
  ) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await fn();
      invalidate();
      after?.();
    } catch (e) {
      const message =
        axios.isAxiosError(e) && e.response?.data?.message
          ? String(e.response.data.message)
          : failMessage;
      Alert.alert("오류", message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = (teamType: TeamType) =>
    run(() => joinMatch(matchId, { teamType }), "매치 신청에 실패했어요.");

  const handleCancel = () =>
    run(() => cancelMatch(matchId), "매치 취소에 실패했어요.");

  const handleDelete = () =>
    run(() => deleteMatch(matchId), "매치 삭제에 실패했어요.", () =>
      navigation.goBack(),
    );

  return { handleJoin, handleCancel, handleDelete, isLoading };
}
