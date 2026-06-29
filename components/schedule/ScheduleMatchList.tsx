import { ActivityIndicator } from "react-native";

import { AppText } from "@/components/AppText";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { MatchCard } from "@/components/match/MatchCard";
import { useMatches } from "@/features/home/hooks/useMatches";
import { formatMatchDate } from "@/shared/utils/formatMatch";

type ScheduleMatchListProps = {
  selectedDate: string; // "YYYY-MM-DD"
};

export function ScheduleMatchList({ selectedDate }: ScheduleMatchListProps) {
  const { data: matches, isLoading } = useMatches();

  // 선택한 날짜의 매치만 필터링
  const filtered = matches?.filter((m) => m.matchDate === selectedDate) ?? [];

  return (
    <VStack space="md" className="mt-5 px-4">
      {/* 선택한 날짜 라벨 (예: 6월 29일 월요일) */}
      <AppText size="md" weight="bold" className="text-foreground">
        {formatMatchDate(selectedDate)}
      </AppText>

      {isLoading ? (
        <Box className="py-12">
          <ActivityIndicator />
        </Box>
      ) : filtered.length === 0 ? (
        // 매치 없음
        <VStack space="xs" className="items-center py-12">
          <AppText size="sm" weight="bold" className="text-foreground">
            매치가 없어요
          </AppText>
          <AppText size="xs" className="text-muted-foreground">
            다른 날짜를 선택해보세요!
          </AppText>
        </VStack>
      ) : (
        // 매치 카드 목록
        <VStack space="md">
          {filtered.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </VStack>
      )}
    </VStack>
  );
}

export default ScheduleMatchList;
