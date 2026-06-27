import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { AppText } from "@/components/AppText";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { signup } from "@/entities/auth/api";
import type { SignupRequest } from "@/entities/auth/types/request/SignupRequest";

type Form = {
  username: string;
  password: string;
  name: string;
  grade: string;
  room: string;
  number: string;
};

export default function SignupScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState<Form>({
    username: "",
    password: "",
    name: "",
    grade: "",
    room: "",
    number: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (key: keyof Form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.username.trim().length >= 4 &&
    form.password.length >= 8 &&
    form.name.trim().length > 0 &&
    form.grade !== "" &&
    form.room !== "" &&
    form.number !== "";

  const onSubmit = async () => {
    setLoading(true);
    try {
      const body: SignupRequest = {
        username: form.username.trim(),
        password: form.password,
        name: form.name.trim(),
        grade: Number(form.grade),
        room: Number(form.room),
        number: Number(form.number),
      };
      await signup(body);
      Alert.alert("회원가입 완료", "로그인해주세요.", [
        { text: "확인", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      const message =
        axios.isAxiosError(e) && e.response?.data?.message
          ? String(e.response.data.message)
          : "회원가입에 실패했어요.";
      Alert.alert("회원가입 실패", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          <AppText size="2xl" weight="bold" className="text-foreground">
            회원가입
          </AppText>
          <AppText className="mt-1 text-muted-foreground">
            밥축 계정을 만들어요
          </AppText>

          <View className="mt-8 gap-6">
            <Input
              label="아이디 (4자 이상)"
              value={form.username}
              onChange={(v) => set("username", v)}
            />
            <Input
              label="비밀번호 (8자 이상)"
              type="password"
              value={form.password}
              onChange={(v) => set("password", v)}
            />
            <Input
              label="이름"
              value={form.name}
              onChange={(v) => set("name", v)}
            />
            <Input
              label="학년"
              type="number"
              maxLength={1}
              value={form.grade}
              onChange={(v) => set("grade", v)}
            />
            <Input
              label="반"
              type="number"
              maxLength={2}
              value={form.room}
              onChange={(v) => set("room", v)}
            />
            <Input
              label="번호"
              type="number"
              maxLength={2}
              value={form.number}
              onChange={(v) => set("number", v)}
            />
          </View>

          <View className="mt-10">
            <Button onPress={onSubmit} disabled={!isValid || loading}>
              {loading ? "가입 중..." : "회원가입"}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
