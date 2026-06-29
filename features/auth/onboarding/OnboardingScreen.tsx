import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { RocketText } from "@/components/RocketText";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/Button";
import { ChoiceCard } from "@/components/ChoiceCard";
import { SlideIn } from "@/components/SlideIn";
import {
  GENDER_OPTIONS,
  SKILL_OPTIONS,
} from "@/shared/constants/profileOptions";
import { useOnboarding } from "@/features/auth/onboarding/useOnboarding";

export default function OnboardingScreen() {
  const { gender, setGender, skill, setSkill, isValid, isLoading, handleSubmit } =
    useOnboarding();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 py-6">
          <VStack space="xs" className="mb-10">
            <RocketText className="text-3xl text-foreground">환영해요!</RocketText>
            <AppText className="text-muted-foreground">
              시작 전에 두 가지만 알려주세요
            </AppText>
          </VStack>

          {/* 성별 */}
          <VStack space="md" className="mb-8">
            <AppText size="lg" weight="bold" className="text-foreground">
              성별
            </AppText>
            <HStack space="md">
              {GENDER_OPTIONS.map((opt) => (
                <ChoiceCard
                  key={opt.value}
                  label={opt.label}
                  icon={opt.icon}
                  selected={gender === opt.value}
                  onPress={() => setGender(opt.value)}
                />
              ))}
            </HStack>
          </VStack>

          {/* 축구 실력 (성별 선택 후 등장) */}
          {gender ? (
            <SlideIn delay={0}>
              <VStack space="md" className="mb-8">
                <AppText size="lg" weight="bold" className="text-foreground">
                  축구 실력
                </AppText>
                <HStack space="sm">
                  {SKILL_OPTIONS.map((opt) => (
                    <ChoiceCard
                      key={opt.value}
                      label={opt.label}
                      icon={opt.icon}
                      selected={skill === opt.value}
                      onPress={() => setSkill(opt.value)}
                    />
                  ))}
                </HStack>
              </VStack>
            </SlideIn>
          ) : null}

          <View className="flex-1" />

          <Button onPress={handleSubmit} disabled={!isValid || isLoading}>
            {isLoading ? "저장 중..." : "완료"}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
