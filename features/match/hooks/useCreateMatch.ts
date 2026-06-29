import { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";

import { createMatch } from "@/entities/match/api";
import type { CreateMatchRequest } from "@/entities/match/types/request/CreateMatchRequest";

const INITIAL: CreateMatchRequest = {
  title: "",
  matchDate: "",
  matchTime: "",
  teamSize: 0,
  durationMinutes: 0,
  teamACaptainId: 0,
  teamBCaptainId: 0,
};

// 매치 생성 폼의 상태/검증/제출을 담당하는 훅 (화면은 이걸 그대로 가져다 씀)
export function useCreateMatch() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [values, setValues] = useState<CreateMatchRequest>(INITIAL);
  const [isLoading, setIsLoading] = useState(false);

  // 필드 하나를 갱신 (문자열/숫자 모두 허용)
  const handleChange = <K extends keyof CreateMatchRequest>(
    field: K,
    value: CreateMatchRequest[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  // 제출 가능 조건: 전부 채워졌고 인원이 4명 이상 짝수, 주장 둘 다 선택됨
  const isValid =
    values.title.trim().length > 0 &&
    values.matchDate.length > 0 &&
    values.matchTime.length > 0 &&
    values.durationMinutes > 0 &&
    values.teamSize >= 4 &&
    values.teamSize % 2 === 0 &&
    values.teamACaptainId > 0 &&
    values.teamBCaptainId > 0 &&
    values.teamACaptainId !== values.teamBCaptainId;

  const handleSubmit = async () => {
    if (isLoading || !isValid) return;
    setIsLoading(true);
    try {
      await createMatch(values);
      // 목록 캐시 무효화 → 홈/일정의 매치 목록이 새 매치를 반영
      await queryClient.invalidateQueries({ queryKey: ["matches"] });
      navigation.goBack();
    } catch (e) {
      const message =
        axios.isAxiosError(e) && e.response?.data?.message
          ? String(e.response.data.message)
          : "매치 생성에 실패했어요.";
      Alert.alert("매치 생성 실패", message);
    } finally {
      setIsLoading(false);
    }
  };

  return { values, handleChange, isValid, isLoading, handleSubmit };
}
