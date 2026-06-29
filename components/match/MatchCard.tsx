import { Image, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppText } from "@/components/AppText";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { MatchStatusLabel, statusStyle } from "@/entities/common/Enum";
import { formatMatchDate, formatMatchTime } from "@/shared/utils/formatMatch";
import type { MatchListResponse } from "@/entities/match/types/response/MatchResponse";
import type { RootStackParamList } from "@/app/App";

const profileFallback = require("@/assets/icons/profile.png");

function TeamCaptain({ name, image }: { name: string; image: string | null }) {
  return (
    <VStack space="xs" className="items-center w-16">
      <Image
        source={image ? { uri: image } : profileFallback}
        style={{ width: 48, height: 48, borderRadius: 24 }}
        resizeMode="cover"
      />
      <AppText size="xs" weight="medium" className="text-muted-foreground">
        {name}팀
      </AppText>
    </VStack>
  );
}

type MatchCardProps = { match: MatchListResponse };

export function MatchCard({ match }: MatchCardProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      // 카드를 누르면 매치 상세 화면으로 이동 (matchId 전달)
      onPress={() => navigation.navigate("MatchDetail", { matchId: match.id })}
      className="active:opacity-90"
    >
      <Box className="relative overflow-hidden rounded-2xl bg-primary-subtle">
        {/* 좌상단 상태 배지 (모집중/마감/종료) */}
        <View
          className={`absolute left-0 top-0 rounded-br-2xl px-3 py-1.5 ${statusStyle[match.status]}`}
        >
          <AppText size="xs" weight="bold" className="text-white">
            {MatchStatusLabel[match.status]}
          </AppText>
        </View>

        {/* A팀 — 시간/날짜 — B팀 */}
        <HStack className="items-center justify-between px-6 pb-5 pt-9">
          <TeamCaptain
            name={match.teamACaptain.name}
            image={match.teamACaptain.profileImage}
          />

          <VStack space="xs" className="items-center">
            <AppText size="2xl" weight="extrabold" className="text-foreground">
              {formatMatchTime(match.matchTime)}
            </AppText>
            <AppText size="xs" className="text-muted-foreground">
              {formatMatchDate(match.matchDate)}
            </AppText>
          </VStack>

          <TeamCaptain
            name={match.teamBCaptain.name}
            image={match.teamBCaptain.profileImage}
          />
        </HStack>
      </Box>
    </Pressable>
  );
}

export default MatchCard;
