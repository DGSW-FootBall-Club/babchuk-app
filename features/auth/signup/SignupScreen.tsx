import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { AppText } from "@/components/AppText";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { BackButton } from "@/components/BackButton";
import { useSignup } from "@/features/auth/hooks/useSignup";

export default function SignupScreen() {
  const {
    values,
    handleChange,
    preview,
    handleImage,
    isValid,
    isLoading,
    handleSignup,
  } = useSignup();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BackButton />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <Pressable onPress={Keyboard.dismiss}>
            <View className="px-6 py-4">
          <AppText size="2xl" weight="bold" className="text-foreground">
            회원가입
          </AppText>
          <AppText className="mt-1 text-muted-foreground">
            밥축 계정을 만들어요
          </AppText>

          {/* 프로필 이미지 선택 */}
          <View className="flex-row items-center gap-4 mt-8">
            <Pressable onPress={handleImage} className="active:opacity-70">
              <View className="h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border border-background-200 bg-background-100">
                {preview ? (
                  <Image
                    source={{ uri: preview }}
                    style={{ width: 72, height: 72 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="add" size={28} color="#8b95a1" />
                )}
              </View>
            </Pressable>
            <View className="flex-1">
              <AppText size="sm" weight="medium" className="text-foreground">
                프로필 이미지 선택{" "}
                <AppText size="xs" className="text-muted-foreground">
                  (선택)
                </AppText>
              </AppText>
              <AppText size="xs" className="mt-0.5 text-muted-foreground">
                나중에 마이페이지에서 바꿀 수 있어요
              </AppText>
            </View>
          </View>

          <View className="gap-6 mt-8">
            <Input
              label="아이디 (4자 이상)"
              value={values.username}
              onChange={(v) => handleChange("username", v)}
            />
            <Input
              label="비밀번호 (8자 이상)"
              type="password"
              value={values.password}
              onChange={(v) => handleChange("password", v)}
            />
            <Input
              label="이름"
              value={values.name}
              onChange={(v) => handleChange("name", v)}
            />

            <View className="flex-row gap-4">
              <View className="flex-1">
                <Input
                  label="학년"
                  type="number"
                  maxLength={1}
                  value={values.grade}
                  onChange={(v) => handleChange("grade", v)}
                />
              </View>
              <View className="flex-1">
                <Input
                  label="반"
                  type="number"
                  maxLength={2}
                  value={values.room}
                  onChange={(v) => handleChange("room", v)}
                />
              </View>
              <View className="flex-1">
                <Input
                  label="번호"
                  type="number"
                  maxLength={2}
                  value={values.number}
                  onChange={(v) => handleChange("number", v)}
                />
              </View>
            </View>
          </View>

            <View className="mt-10">
              <Button onPress={handleSignup} disabled={!isValid || isLoading}>
                {isLoading ? "가입 중..." : "회원가입"}
              </Button>
            </View>
          </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
