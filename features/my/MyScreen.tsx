import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { AppText } from "@/components/AppText";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useTokenStore } from "@/shared/store/tokenStore";
import { useMyInfo } from "@/features/my/hooks/useMyInfo";

export default function MyScreen() {
  const clearToken = useTokenStore((s) => s.clearToken);
  const { data: me, isLoading, isError } = useMyInfo();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="마이" />

      <VStack className="px-4 py-4" space="xl">
        {isLoading ? (
          <ActivityIndicator />
        ) : isError ? (
          <AppText className="text-danger">
            내 정보를 불러오지 못했어요.
          </AppText>
        ) : me ? (
          <VStack space="xs">
            <AppText size="2xl" weight="bold" className="text-foreground">
              {me.name}
            </AppText>
            <AppText className="text-muted-foreground">
              {me.studentId} · {me.role}
            </AppText>
            {me.skillType ? (
              <AppText size="sm" className="text-body">
                실력: {me.skillType}
              </AppText>
            ) : null}
          </VStack>
        ) : null}

        <Button action="negative" variant="outline" onPress={clearToken}>
          <ButtonText>로그아웃</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
