import { useState } from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppText } from "@/components/AppText";
import { HStack } from "@/components/ui/hstack";
import { useMatches } from "@/features/home/hooks/useMatches";

type ScheduleCalendarProps = {
  selectedDate: string; // "YYYY-MM-DD"
  onSelect: (date: string) => void;
};

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

// Date -> "YYYY-MM-DD"
function toStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

// 오늘 0시
function getToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// 해당 월의 달력 칸 배열. 1일이 시작하는 요일만큼 앞을 null로 채워 정렬한다.
// 예: 6월 1일이 일요일이면 [1,2,...], 화요일이면 [null,null,1,2,...]
function getCalendarDays(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();
  const startDay = first.getDay(); // 1일의 요일(0=일)

  const days: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let d = 1; d <= lastDate; d++) days.push(new Date(year, month, d));
  return days;
}

export function ScheduleCalendar({
  selectedDate,
  onSelect,
}: ScheduleCalendarProps) {
  const today = getToday();
  // 화면에 보고 있는 연/월 (이전/다음 버튼으로 이동)
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // 매치가 있는 날짜들 — 달력에 점으로 표시하려고 Set으로 모음
  const { data: matches } = useMatches();
  const matchDates = new Set((matches ?? []).map((m) => m.matchDate));

  const days = getCalendarDays(viewYear, viewMonth);
  const todayStr = toStr(today);

  const goPrev = () => {
    // 1월에서 이전 → 작년 12월
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    // 12월에서 다음 → 내년 1월
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <View className="px-4">
      {/* 헤더: ‹  YYYY년 M월  › */}
      <HStack className="mb-4 items-center justify-between">
        <Pressable onPress={goPrev} hitSlop={8} className="active:opacity-50">
          <Ionicons name="chevron-back" size={22} color="#8b95a1" />
        </Pressable>
        <AppText size="xl" weight="bold" className="text-foreground">
          {viewYear}년 {viewMonth + 1}월
        </AppText>
        <Pressable onPress={goNext} hitSlop={8} className="active:opacity-50">
          <Ionicons name="chevron-forward" size={22} color="#8b95a1" />
        </Pressable>
      </HStack>

      {/* 요일 헤더 (일~토) */}
      <View className="mb-1 flex-row">
        {DAYS.map((day, i) => (
          <View key={day} className="items-center py-1.5" style={{ width: `${100 / 7}%` }}>
            <AppText
              size="xs"
              weight="semibold"
              className={
                i === 0
                  ? "text-danger"
                  : i === 6
                    ? "text-primary"
                    : "text-muted-foreground"
              }
            >
              {day}
            </AppText>
          </View>
        ))}
      </View>

      {/* 날짜 그리드 (7열) */}
      <View className="flex-row flex-wrap">
        {days.map((d, i) => {
          // 앞쪽 빈칸(이전 달 자리)
          if (!d) {
            return (
              <View
                key={`empty-${i}`}
                className="py-1"
                style={{ width: `${100 / 7}%` }}
              />
            );
          }

          const str = toStr(d);
          const active = selectedDate === str; // 선택된 날
          const isToday = str === todayStr; // 오늘
          const hasMatch = matchDates.has(str); // 매치 있는 날
          const dow = d.getDay();

          const numColor = active
            ? "text-white"
            : dow === 0
              ? "text-danger"
              : dow === 6
                ? "text-primary"
                : "text-foreground";

          return (
            <Pressable
              key={str}
              onPress={() => onSelect(str)}
              className="items-center py-1"
              style={{ width: `${100 / 7}%` }}
            >
              {/* 선택=파란 채움 / 오늘=파란 테두리 */}
              <View
                className={`h-10 w-10 items-center justify-center rounded-xl ${
                  active
                    ? "bg-primary"
                    : isToday
                      ? "border-2 border-primary"
                      : ""
                }`}
              >
                <AppText size="md" weight="semibold" className={numColor}>
                  {d.getDate()}
                </AppText>
              </View>
              {/* 매치 있는 날 점 표시 (선택된 날은 생략) */}
              <View
                className={`mt-0.5 h-1 w-1 rounded-full ${
                  hasMatch && !active ? "bg-primary" : "bg-transparent"
                }`}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default ScheduleCalendar;
