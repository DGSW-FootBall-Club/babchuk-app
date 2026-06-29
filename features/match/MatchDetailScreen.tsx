import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { AppText } from "@/components/AppText";
import { BackButton } from "@/components/BackButton";
import { Skeleton } from "@/components/Skeleton";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { useMatch, useIsJoined } from "@/features/match/hooks/useMatch";
import { useMatchActions } from "@/features/match/hooks/useMatchActions";
import { MatchStatusLabel, statusStyle } from "@/entities/common/Enum";
import { formatMatchDate, formatMatchTime } from "@/shared/utils/formatMatch";
import type { RootStackParamList } from "@/app/App";
import type { UserResponse } from "@/entities/user/types/response/UserResponse";

import RedUniform from "@/assets/icons/red-uniform.svg";
import BlueUniform from "@/assets/icons/blue-uniform.svg";

const profileFallback = require("@/assets/icons/profile.png");

// 선수 아바타 + 이름
function PlayerAvatar({ user }: { user: UserResponse }) {
  return (
    <VStack space="xs" className="items-center">
      <Image
        source={user.profileImage ? { uri: user.profileImage } : profileFallback}
        style={{ width: 48, height: 48, borderRadius: 24 }}
        resizeMode="cover"
      />
      <AppText size="xs" className="text-foreground">
        {user.name}
      </AppText>
    </VStack>
  );
}

// 섹션 묶음 (제목 + 내용)
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <VStack space="md">
      <AppText size="lg" weight="bold" className="text-foreground">
        {title}
      </AppText>
      {children}
    </VStack>
  );
}

// 매치 정보 한 줄 (아이콘 + 텍스트)
function InfoItem({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <HStack space="sm" className="w-1/2 items-center py-1.5">
      <Ionicons name={icon} size={18} color="#4e5968" />
      <AppText className="text-foreground">{text}</AppText>
    </HStack>
  );
}

// 로딩 스켈레톤 (상세 화면 모양)
function DetailSkeleton() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <BackButton />
      <VStack space="xl" className="px-5 py-4">
        <Skeleton width="100%" height={160} radius={16} />
        <VStack space="sm">
          <Skeleton width={180} height={16} />
          <Skeleton width={140} height={24} />
        </VStack>
        <Skeleton width="100%" height={90} radius={16} />
        <Skeleton width="100%" height={140} radius={16} />
        <Skeleton width="100%" height={52} radius={16} />
      </VStack>
    </SafeAreaView>
  );
}

export default function MatchDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "MatchDetail">>();
  const matchId = route.params?.matchId ?? 0;

  const { data: match, isLoading } = useMatch(matchId);
  const { data: isJoined } = useIsJoined(matchId);
  const { handleJoin, handleCancel, isLoading: actionLoading } =
    useMatchActions(matchId);

  const [selectedTeam, setSelectedTeam] = useState<"A" | "B">("A");

  // 한 팀당 모집 가능 인원(주장 제외)
  const perTeam = match ? match.teamSize / 2 - 1 : 0;
  const aFull = match ? match.teamA.members.length >= perTeam : false;
  const bFull = match ? match.teamB.members.length >= perTeam : false;

  // 한쪽이 꽉 차면 자동으로 빈 팀을 선택
  useEffect(() => {
    if (aFull && !bFull) setSelectedTeam("B");
    if (bFull && !aFull) setSelectedTeam("A");
  }, [aFull, bFull]);

  if (isLoading || !match) return <DetailSkeleton />;

  const closed = match.status === "CLOSED" || match.status === "FINISHED";
  const teamSelectDisabled = !!isJoined || closed;
  const maxMembers = Math.max(
    match.teamA.members.length,
    match.teamB.members.length,
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <BackButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* 경기장 헤더 (이미지 자산이 커서 초록 피치 박스로 대체) */}
        <View className="mx-5 mb-5 h-40 items-center justify-center rounded-2xl bg-success">
          <Ionicons name="football" size={48} color="#ffffff" />
        </View>

        <VStack space="xl" className="px-5">
          {/* 제목 / 날짜·시간 / 상태 */}
          <VStack space="xs">
            <HStack space="sm" className="items-center">
              <AppText className="text-muted-foreground">
                {formatMatchDate(match.matchDate)}{" "}
                {formatMatchTime(match.matchTime)}
              </AppText>
              <View
                className={`rounded-md px-2 py-0.5 ${statusStyle[match.status]}`}
              >
                <AppText size="xs" weight="bold" className="text-white">
                  {MatchStatusLabel[match.status]}
                </AppText>
              </View>
            </HStack>
            <AppText size="2xl" weight="extrabold" className="text-foreground">
              {match.title}
            </AppText>
          </VStack>

          {/* 매치 정보 */}
          <Section title="매치 정보">
            <HStack className="flex-wrap">
              <InfoItem icon="ribbon-outline" text="모든 레벨" />
              <InfoItem icon="people-outline" text="남녀 모두" />
              <InfoItem
                icon="time-outline"
                text={`${match.durationMinutes}분`}
              />
              <InfoItem
                icon="football-outline"
                text={`${match.teamSize / 2} vs ${match.teamSize / 2}`}
              />
            </HStack>
          </Section>

          {/* 팀 선택 */}
          <Section title="팀 선택">
            <HStack
              space="md"
              className={`rounded-2xl bg-success p-4 ${
                teamSelectDisabled ? "opacity-60" : ""
              }`}
            >
              {(
                [
                  {
                    key: "A" as const,
                    Uniform: RedUniform,
                    captain: match.teamA.captain,
                    count: match.teamA.members.length,
                    full: aFull,
                  },
                  {
                    key: "B" as const,
                    Uniform: BlueUniform,
                    captain: match.teamB.captain,
                    count: match.teamB.members.length,
                    full: bFull,
                  },
                ]
              ).map(({ key, Uniform, captain, count, full }) => {
                const selected = selectedTeam === key;
                return (
                  <Pressable
                    key={key}
                    onPress={() => setSelectedTeam(key)}
                    disabled={teamSelectDisabled || full}
                    className={`flex-1 items-center rounded-xl py-3 ${
                      selected ? "bg-white/20" : ""
                    } ${full ? "opacity-40" : "active:opacity-80"}`}
                  >
                    <VStack space="xs" className="items-center">
                      <Uniform width={44} height={44} />
                      <AppText weight="bold" className="text-white">
                        {captain.name} 팀
                      </AppText>
                      {/* 선택 라디오 */}
                      <View
                        className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
                          selected ? "border-white bg-white" : "border-white/50"
                        }`}
                      >
                        {selected ? (
                          <View className="h-2 w-2 rounded-full bg-success" />
                        ) : null}
                      </View>
                      <AppText size="xs" className="text-white/70">
                        {count}/{perTeam}
                      </AppText>
                    </VStack>
                  </Pressable>
                );
              })}
            </HStack>
          </Section>

          {/* 주장 */}
          <Section title="주장">
            <HStack>
              <Box className="flex-1 items-center">
                <PlayerAvatar user={match.teamA.captain} />
              </Box>
              <Box className="flex-1 items-center">
                <PlayerAvatar user={match.teamB.captain} />
              </Box>
            </HStack>
          </Section>

          {/* 선발 명단 */}
          {match.teamA.members.length > 0 || match.teamB.members.length > 0 ? (
            <Section title="선발 명단">
              <VStack space="md">
                {Array.from({ length: maxMembers }).map((_, i) => (
                  <HStack key={i}>
                    <Box className="flex-1 items-center">
                      {match.teamA.members[i] ? (
                        <PlayerAvatar user={match.teamA.members[i]} />
                      ) : null}
                    </Box>
                    <Box className="flex-1 items-center">
                      {match.teamB.members[i] ? (
                        <PlayerAvatar user={match.teamB.members[i]} />
                      ) : null}
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </Section>
          ) : null}

          {/* 하단 액션 버튼 (상태에 따라 다름) */}
          <ActionButton
            status={match.status}
            isJoined={!!isJoined}
            loading={actionLoading}
            selectedCaptainName={
              selectedTeam === "A"
                ? match.teamA.captain.name
                : match.teamB.captain.name
            }
            onJoin={() =>
              handleJoin(selectedTeam === "A" ? "TEAM_A" : "TEAM_B")
            }
            onCancel={handleCancel}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

// 상태별 하단 버튼: 종료/마감(비활성), 참가중(취소), 그 외(신청)
function ActionButton({
  status,
  isJoined,
  loading,
  selectedCaptainName,
  onJoin,
  onCancel,
}: {
  status: "OPEN" | "CLOSED" | "FINISHED";
  isJoined: boolean;
  loading: boolean;
  selectedCaptainName: string;
  onJoin: () => void;
  onCancel: () => void;
}) {
  if (status === "FINISHED") {
    return <DisabledButton text="경기 종료" />;
  }
  if (isJoined) {
    return (
      <Pressable
        onPress={onCancel}
        disabled={loading}
        className="items-center rounded-2xl bg-danger py-4 active:opacity-80"
      >
        <AppText weight="bold" className="text-white">
          {loading ? "처리 중..." : "신청 취소"}
        </AppText>
      </Pressable>
    );
  }
  if (status === "CLOSED") {
    return <DisabledButton text="마감됨" />;
  }
  return (
    <Pressable
      onPress={onJoin}
      disabled={loading}
      className="items-center rounded-2xl bg-primary py-4 active:opacity-80"
    >
      <AppText weight="bold" className="text-white">
        {loading ? "처리 중..." : `${selectedCaptainName} 팀으로 신청하기`}
      </AppText>
    </Pressable>
  );
}

function DisabledButton({ text }: { text: string }) {
  return (
    <View className="items-center rounded-2xl bg-muted-foreground py-4 opacity-80">
      <AppText weight="bold" className="text-white">
        {text}
      </AppText>
    </View>
  );
}
