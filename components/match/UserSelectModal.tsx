import { FlatList, Image, Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { AppText } from "@/components/AppText";
import { Skeleton } from "@/components/Skeleton";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useAllUsers } from "@/features/match/hooks/useAllUsers";
import type { UserResponse } from "@/entities/user/types/response/UserResponse";

const profileFallback = require("@/assets/icons/profile.png");

type UserSelectModalProps = {
  visible: boolean;
  title: string;
  excludeId?: number; // 이미 다른 팀 주장으로 뽑힌 사람은 목록에서 제외
  onSelect: (user: UserResponse) => void;
  onClose: () => void;
};

// 전체 유저 목록에서 한 명을 고르는 풀스크린 모달 (A/B 주장 선택용)
export function UserSelectModal({
  visible,
  title,
  excludeId,
  onSelect,
  onClose,
}: UserSelectModalProps) {
  const { data: users, isLoading } = useAllUsers();

  const list = (users ?? []).filter((u) => u.id !== excludeId);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
        {/* 헤더: 제목 + 닫기 */}
        <HStack className="items-center justify-between px-4 py-3">
          <AppText size="lg" weight="bold" className="text-foreground">
            {title}
          </AppText>
          <Pressable onPress={onClose} hitSlop={8} className="active:opacity-60">
            <Ionicons name="close" size={24} color="#191f28" />
          </Pressable>
        </HStack>

        {isLoading ? (
          // 로딩 → 유저 행 모양 스켈레톤
          <VStack space="md" className="px-4 pt-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <HStack key={i} space="md" className="items-center py-1">
                <Skeleton width={44} height={44} radius={22} />
                <VStack space="xs">
                  <Skeleton width={90} height={14} />
                  <Skeleton width={60} height={12} />
                </VStack>
              </HStack>
            ))}
          </VStack>
        ) : (
          <FlatList
            data={list}
            keyExtractor={(u) => String(u.id)}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                className="active:opacity-60"
              >
                <HStack space="md" className="items-center py-3">
                  <Image
                    source={
                      item.profileImage
                        ? { uri: item.profileImage }
                        : profileFallback
                    }
                    style={{ width: 44, height: 44, borderRadius: 22 }}
                    resizeMode="cover"
                  />
                  <VStack>
                    <AppText weight="bold" className="text-foreground">
                      {item.name}
                    </AppText>
                    <AppText size="xs" className="text-muted-foreground">
                      {item.studentId}
                    </AppText>
                  </VStack>
                </HStack>
              </Pressable>
            )}
            ListEmptyComponent={
              <AppText className="mt-10 text-center text-muted-foreground">
                유저가 없어요.
              </AppText>
            }
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}

export default UserSelectModal;
