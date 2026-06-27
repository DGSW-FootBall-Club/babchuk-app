import { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";

import { useTokenStore } from "@/shared/store/tokenStore";
import { login } from "@/entities/auth/api";
import type { LoginRequest } from "@/entities/auth/types/request/LoginRequest";

export function useLogin() {
  const setTokens = useTokenStore((s) => s.setTokens);

  const [values, setValues] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof LoginRequest, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const isValid =
    values.username.trim().length > 0 && values.password.length > 0;

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const tokens = await login(values);
      setTokens(tokens);
    } catch (e) {
      const message =
        axios.isAxiosError(e) && e.response?.data?.message
          ? String(e.response.data.message)
          : "로그인에 실패했어요. 다시 시도해주세요.";
      Alert.alert("로그인 실패", message);
    } finally {
      setIsLoading(false);
    }
  };

  return { values, handleChange, isValid, handleLogin, isLoading };
}
