import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { Banner } from "@/components/Banner";
import { DateFilter } from "@/components/match/DateFilter";
import { MatchList } from "@/components/match/MatchList";
import { VStack } from "@/components/ui/vstack";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(todayStr());

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Header title="밥축" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        // 플로팅 탭바에 가리지 않도록 하단 여백 확보
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <VStack space="lg">
          {/* 상단 배너 + 빠른 메뉴 (좌우 여백 16) */}
          <Banner />

          {/* 날짜 선택 (가로 스크롤, 자체 좌우 여백) */}
          <DateFilter selectedDate={selectedDate} onSelect={setSelectedDate} />

          {/* 선택한 날짜의 매치 목록 */}
          <MatchList selectedDate={selectedDate} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
