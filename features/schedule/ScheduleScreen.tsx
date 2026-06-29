import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { ScheduleCalendar } from "@/components/schedule/ScheduleCalendar";
import { ScheduleMatchList } from "@/components/schedule/ScheduleMatchList";
import { VStack } from "@/components/ui/vstack";

// 오늘 날짜를 "YYYY-MM-DD"로 (달력 초기 선택값)
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export default function ScheduleScreen() {
  // 선택한 날짜를 들고 있다가 달력(선택) ↔ 매치 목록(필터)에 연결
  const [selectedDate, setSelectedDate] = useState(todayStr());

  return (
    <SafeAreaView className="flex-1 bg-background-0" edges={["top"]}>
      <Header title="일정" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        // 플로팅 탭바에 가리지 않도록 하단 여백 확보
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <VStack space="md" className="pt-2">
          {/* 월 달력: 날짜 선택 + 매치 있는 날 점 표시 */}
          <ScheduleCalendar
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
          {/* 선택한 날짜의 매치 목록 */}
          <ScheduleMatchList selectedDate={selectedDate} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
