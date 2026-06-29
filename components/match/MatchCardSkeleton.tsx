import { Skeleton } from "@/components/Skeleton";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";

// MatchCard와 같은 레이아웃의 로딩 자리표시(스켈레톤).
// 목록 로딩 시 실제 카드와 비슷한 모양으로 보여줘 깜빡임을 줄인다.
export function MatchCardSkeleton() {
  return (
    <Box className="rounded-2xl bg-background-100 px-6 py-6">
      <HStack className="items-center justify-between">
        {/* A팀 주장 자리 */}
        <VStack space="xs" className="w-16 items-center">
          <Skeleton width={48} height={48} radius={24} />
          <Skeleton width={40} height={12} />
        </VStack>
        {/* 가운데 시간/날짜 자리 */}
        <VStack space="xs" className="items-center">
          <Skeleton width={90} height={24} />
          <Skeleton width={110} height={12} />
        </VStack>
        {/* B팀 주장 자리 */}
        <VStack space="xs" className="w-16 items-center">
          <Skeleton width={48} height={48} radius={24} />
          <Skeleton width={40} height={12} />
        </VStack>
      </HStack>
    </Box>
  );
}

export default MatchCardSkeleton;
