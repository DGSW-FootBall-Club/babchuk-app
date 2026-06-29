import { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

import { updateMyInfo } from "@/entities/user/api";
import type { GenderType, SkillType } from "@/entities/common/Enum";

export function useOnboarding() {
  const queryClient = useQueryClient();
  const [gender, setGender] = useState<GenderType | null>(null);
  const [skill, setSkill] = useState<SkillType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = gender != null && skill != null;

  const handleSubmit = async () => {
    if (gender == null || skill == null || isLoading) return;
    setIsLoading(true);
    try {
      await updateMyInfo({ gender, skillType: skill });
      // refetch "me": gender/skill are now set, so the gate swaps to the tabs.
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    } catch (e) {
      const message =
        axios.isAxiosError(e) && e.response?.data?.message
          ? String(e.response.data.message)
          : "저장에 실패했어요.";
      Alert.alert("저장 실패", message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    gender,
    setGender,
    skill,
    setSkill,
    isValid,
    isLoading,
    handleSubmit,
  };
}
