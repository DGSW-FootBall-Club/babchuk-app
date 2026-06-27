import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RocketText } from "@/components/RocketText";
import { AppText } from "@/components/AppText";
import { SlideIn } from "@/components/SlideIn";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useLogin } from "@/features/auth/hooks/useLogin";
import type { AuthStackParamList } from "@/navigation/AuthStack";

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { values, handleChange, isValid, handleLogin, isLoading } = useLogin();

  return (
    <SafeAreaView className="flex-1 px-6 bg-background">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable className="flex-1" onPress={Keyboard.dismiss}>
          <View className="items-center justify-center flex-1">
            <SlideIn delay={0}>
              <RocketText className="text-7xl">밥축</RocketText>
            </SlideIn>
            <SlideIn delay={0.3}>
              <RocketText className="text-lg">밥먹고 축구 할 사람?</RocketText>
            </SlideIn>
          </View>

          <View className="mb-12">
            <View className="gap-8 p-2 mb-8">
              <Input
                label="아이디"
                type="text"
                value={values.username}
                onChange={(v) => handleChange("username", v)}
              />
              <Input
                label="비밀번호"
                type="password"
                value={values.password}
                onChange={(v) => handleChange("password", v)}
              />
            </View>

            <View className="gap-3">
              <Button
                onPress={() => {
                  if (isValid) handleLogin();
                }}
                disabled={!isValid || isLoading}
              >
                {isLoading ? "로그인 하는중..." : "로그인"}
              </Button>

              <View className="flex-row justify-center mt-2">
                <AppText size="sm" className="text-muted-foreground">
                  계정이 없다면?{" "}
                </AppText>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                  <AppText
                    size="sm"
                    weight="semibold"
                    className="underline text-primary"
                  >
                    회원가입
                  </AppText>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
