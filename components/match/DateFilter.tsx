import { ScrollView, Pressable } from "react-native";

import { AppText } from "@/components/AppText";
import { VStack } from "@/components/ui/vstack";

type DateFilterProps = {
  selectedDate: string; // "YYYY-MM-DD"
  onSelect: (date: string) => void;
};

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

// Date -> "YYYY-MM-DD" (서버/선택값과 같은 포맷)
function toStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

// 오늘부터 count일치의 날짜 배열을 만든다.
function getDates(count = 30) {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    return d;
  });
}

export function DateFilter({ selectedDate, onSelect }: DateFilterProps) {
  const dates = getDates(30);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
    >
      {dates.map((d) => {
        const str = toStr(d);
        const active = selectedDate === str;
        const day = d.getDay();
        const isSun = day === 0;
        const isSat = day === 6;

        // 선택됨 → 파란 배경/흰 글씨. 아니면 일요일 빨강 / 토요일 파랑 / 평일 기본.
        const numColor = active
          ? "text-white"
          : isSun
            ? "text-danger"
            : isSat
              ? "text-primary"
              : "text-foreground";
        const dayColor = active
          ? "text-white/80"
          : isSun
            ? "text-danger"
            : isSat
              ? "text-primary"
              : "text-muted-foreground";

        return (
          <Pressable
            key={str}
            onPress={() => onSelect(str)}
            // 고정 너비(w-14)로 모든 날짜 버튼 크기를 동일하게 (1·29 등 자릿수 무관)
            className={`w-14 items-center rounded-2xl py-2.5 active:opacity-70 ${
              active ? "bg-primary" : "bg-background-100"
            }`}
          >
            <VStack space="xs" className="items-center">
              <AppText size="lg" weight="bold" className={numColor}>
                {d.getDate()}
              </AppText>
              <AppText size="xs" weight="medium" className={dayColor}>
                {DAYS[day]}
              </AppText>
            </VStack>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export default DateFilter;
