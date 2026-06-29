import { ActivityIndicator } from "react-native";

import { AppText } from "@/components/AppText";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { MatchCard } from "@/components/match/MatchCard";
import { useMatches } from "@/features/home/hooks/useMatches";

type MatchListProps = {
  selectedDate: string; // "YYYY-MM-DD" — 이 날짜의 매치만 보여준다
};

export function MatchList({ selectedDate }: MatchListProps) {
  const { data: matches, isLoading } = useMatches();

  // 전체 매치 중 선택한 날짜와 일치하는 것만 추림
  const filtered = matches?.filter((m) => m.matchDate === selectedDate) ?? [];

  // 1) 로딩 중
  if (isLoading) {
    return (
      <Box className="py-16">
        <ActivityIndicator />
      </Box>
    );
  }

  // 2) 해당 날짜에 매치가 없음
  if (filtered.length === 0) {
    return (
      <VStack space="xs" className="items-center py-16">
        <AppText size="md" weight="bold" className="text-foreground">
          매치가 없어요
        </AppText>
        <AppText size="sm" className="text-muted-foreground">
          다른 날짜를 선택해보세요!
        </AppText>
      </VStack>
    );
  }

  // 3) 매치 카드 목록
  return (
    <VStack space="md" className="px-4">
      {filtered.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </VStack>
  );
}

export default MatchList;
