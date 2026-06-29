import { useState } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Header } from "@/components/Header";
import { AppText } from "@/components/AppText";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { NumberStepper } from "@/components/NumberStepper";
import { ScheduleCalendar } from "@/components/schedule/ScheduleCalendar";
import { UserSelectModal } from "@/components/match/UserSelectModal";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { useCreateMatch } from "@/features/match/hooks/useCreateMatch";
import { formatMatchTime } from "@/shared/utils/formatMatch";
import type { UserResponse } from "@/entities/user/types/response/UserResponse";

// 어떤 모달이 열려있는지
type ModalType = "date" | "captainA" | "captainB" | null;

// 시간 프리셋 (점심/저녁) — 직접 설정은 커스텀 시간 모달 대신 간단히 프리셋만 우선 제공
const LUNCH = "13:10";
const DINNER = "18:45";

// 경기 시간 프리셋
const DURATIONS = [
  { label: "30분", value: 30 },
  { label: "1시간", value: 60 },
  { label: "1시간 30분", value: 90 },
  { label: "2시간", value: 120 },
];

// 섹션 라벨
function Label({ children }: { children: string }) {
  return (
    <AppText size="sm" weight="semibold" className="mb-2 text-muted-foreground">
      {children}
    </AppText>
  );
}

// "2026-06-29" -> "2026. 6. 29 (월)"
function formatDateLabel(date: string) {
  if (!date) return "";
  const [y, m, d] = date.split("-").map(Number);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dow = new Date(y, m - 1, d).getDay();
  return `${y}. ${m}. ${d} (${days[dow]})`;
}

// 누르면 모달을 여는 선택 줄 (날짜/주장 공통)
function SelectRow({
  placeholder,
  value,
  onPress,
}: {
  placeholder: string;
  value?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between rounded-2xl bg-background-100 px-4 py-4 active:opacity-70"
    >
      <AppText
        className={value ? "text-foreground" : "text-muted-foreground"}
        weight={value ? "semibold" : "regular"}
      >
        {value || placeholder}
      </AppText>
      <Ionicons name="chevron-down" size={16} color="#8b95a1" />
    </Pressable>
  );
}

export default function MatchScreen() {
  const { values, handleChange, isValid, isLoading, handleSubmit } =
    useCreateMatch();
  const [modal, setModal] = useState<ModalType>(null);
  // 주장 표시용(이름) — 실제 제출에는 hook의 id가 들어감
  const [captainA, setCaptainA] = useState<UserResponse | null>(null);
  const [captainB, setCaptainB] = useState<UserResponse | null>(null);

  const selectCaptain = (team: "A" | "B", user: UserResponse) => {
    if (team === "A") {
      setCaptainA(user);
      handleChange("teamACaptainId", user.id);
    } else {
      setCaptainB(user);
      handleChange("teamBCaptainId", user.id);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <Header title="매치 생성" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        // 플로팅 탭바에 가리지 않도록 하단 여백 확보
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <VStack space="xl" className="px-5 py-4">
          {/* 제목 */}
          <Input
            label="매치 제목"
            value={values.title}
            onChange={(v) => handleChange("title", v)}
          />

          {/* 날짜 */}
          <View>
            <Label>날짜</Label>
            <SelectRow
              placeholder="날짜를 선택하세요"
              value={formatDateLabel(values.matchDate)}
              onPress={() => setModal("date")}
            />
          </View>

          {/* 시간 (점심/저녁 프리셋) */}
          <View>
            <Label>시간</Label>
            <HStack space="sm">
              {[
                { label: "점심", time: LUNCH },
                { label: "저녁", time: DINNER },
              ].map(({ label, time }) => {
                const active = values.matchTime === time;
                return (
                  <Pressable
                    key={label}
                    onPress={() => handleChange("matchTime", time)}
                    className={`flex-1 items-center rounded-2xl border-2 py-3 active:opacity-70 ${
                      active
                        ? "border-primary bg-primary/5"
                        : "border-background-100 bg-background-100"
                    }`}
                  >
                    <AppText
                      weight="bold"
                      className={active ? "text-primary" : "text-foreground"}
                    >
                      {label}
                    </AppText>
                    <AppText size="xs" className="text-muted-foreground">
                      {formatMatchTime(time)}
                    </AppText>
                  </Pressable>
                );
              })}
            </HStack>
          </View>

          {/* 경기 시간 (프리셋 칩) */}
          <View>
            <Label>경기 시간</Label>
            <HStack space="sm" className="flex-wrap">
              {DURATIONS.map((d) => {
                const active = values.durationMinutes === d.value;
                return (
                  <Pressable
                    key={d.value}
                    onPress={() => handleChange("durationMinutes", d.value)}
                    className={`rounded-full border px-4 py-2 active:opacity-70 ${
                      active
                        ? "border-primary bg-primary"
                        : "border-background-200 bg-background-100"
                    }`}
                  >
                    <AppText
                      size="sm"
                      weight="medium"
                      className={active ? "text-white" : "text-foreground"}
                    >
                      {d.label}
                    </AppText>
                  </Pressable>
                );
              })}
            </HStack>
          </View>

          {/* 팀 인원 (4명 이상, 짝수) */}
          <View>
            <Label>팀 인원 (양 팀 합계)</Label>
            <NumberStepper
              value={values.teamSize}
              onChange={(v) => handleChange("teamSize", v)}
              min={0}
              max={22}
              step={2}
              suffix="명"
            />
            <AppText size="xs" className="mt-1 text-muted-foreground">
              {values.teamSize >= 4
                ? `${values.teamSize / 2} vs ${values.teamSize / 2}`
                : "최소 4명 이상, 짝수로 선택"}
            </AppText>
          </View>

          {/* 주장 A / B */}
          <View>
            <Label>A팀 주장</Label>
            <SelectRow
              placeholder="A팀 주장 선택"
              value={captainA?.name}
              onPress={() => setModal("captainA")}
            />
          </View>
          <View>
            <Label>B팀 주장</Label>
            <SelectRow
              placeholder="B팀 주장 선택"
              value={captainB?.name}
              onPress={() => setModal("captainB")}
            />
          </View>

          {/* 생성 버튼 */}
          <View className="mt-2">
            <Button onPress={handleSubmit} disabled={!isValid || isLoading}>
              {isLoading ? "생성 중..." : "매치 생성"}
            </Button>
          </View>
        </VStack>
      </ScrollView>

      {/* 날짜 선택 모달 (ScheduleCalendar 재사용) */}
      <Modal
        visible={modal === "date"}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModal(null)}
      >
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
          <HStack className="items-center justify-between px-4 py-3">
            <AppText size="lg" weight="bold" className="text-foreground">
              날짜 선택
            </AppText>
            <Pressable onPress={() => setModal(null)} hitSlop={8}>
              <Ionicons name="close" size={24} color="#191f28" />
            </Pressable>
          </HStack>
          <ScheduleCalendar
            selectedDate={values.matchDate}
            onSelect={(date) => {
              handleChange("matchDate", date);
              setModal(null);
            }}
          />
        </SafeAreaView>
      </Modal>

      {/* 주장 선택 모달 */}
      <UserSelectModal
        visible={modal === "captainA"}
        title="A팀 주장 선택"
        excludeId={captainB?.id}
        onSelect={(u) => selectCaptain("A", u)}
        onClose={() => setModal(null)}
      />
      <UserSelectModal
        visible={modal === "captainB"}
        title="B팀 주장 선택"
        excludeId={captainA?.id}
        onSelect={(u) => selectCaptain("B", u)}
        onClose={() => setModal(null)}
      />
    </SafeAreaView>
  );
}
