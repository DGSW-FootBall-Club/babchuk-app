import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "@/components/Header";
import { AppText } from "@/components/AppText";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { useTokenStore } from "@/shared/store/tokenStore";
import { useMyInfo } from "@/features/my/hooks/useMyInfo";
import { MyCard } from "@/components/My/Card";

const SectionLabel = ({ children }: { children: string }) => (
  <AppText size="sm" weight="medium" className="text-muted-foreground">
    {children}
  </AppText>
);

type MenuRowProps = {
  label: string;
  onPress?: () => void;
  danger?: boolean;
};

const MenuRow = ({ label, onPress, danger }: MenuRowProps) => (
  <Pressable onPress={onPress} className="active:opacity-50">
    <HStack className="items-center justify-between py-4">
      <AppText
        size="lg"
        weight="medium"
        className={danger ? "text-danger" : "text-foreground"}
      >
        {label}
      </AppText>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={danger ? "#c33431" : "#c4c9d0"}
      />
    </HStack>
  </Pressable>
);

export default function MyScreen() {
  const clearToken = useTokenStore((s) => s.clearToken);
  const { data: me, isLoading, isError, refetch, isRefetching } = useMyInfo();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header title="마이" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <VStack className="px-4 py-2" space="2xl">
          {isLoading ? (
            <Box className="py-10">
              <ActivityIndicator />
            </Box>
          ) : isError ? (
            <AppText className="text-danger">
              내 정보를 불러오지 못했어요.
            </AppText>
          ) : me ? (
            <MyCard user={me} />
          ) : null}

          <VStack space="xs" className="px-4 py-4">
            <SectionLabel>환경설정</SectionLabel>
            <HStack className="items-center justify-between py-2">
              <AppText size="lg" weight="medium" className="text-foreground">
                다크 모드
              </AppText>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#e5e8eb", true: "#3b5bff" }}
                thumbColor="#ffffff"
                ios_backgroundColor="#e5e8eb"
              />
            </HStack>
          </VStack>

          <VStack space="xs" className="px-4 py-4">
            <SectionLabel>고객센터</SectionLabel>
            <VStack>
              <MenuRow label="이용약관" onPress={() => {}} />
              <Divider className="bg-background-100" />
              <MenuRow label="개인정보 처리방침" onPress={() => {}} />
              <Divider className="bg-background-100" />
              <MenuRow label="문의하기" onPress={() => {}} />
              <Divider className="bg-background-100" />
              <MenuRow label="로그아웃" danger onPress={clearToken} />
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
