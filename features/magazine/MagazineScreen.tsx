import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { BackButton } from "@/components/BackButton";
import { VStack } from "@/components/ui/vstack";
import { MagazineCard } from "@/components/Magazine/Card";
import { TitleCard } from "@/components/Magazine/TitleCard";

const GUIDE: { title: string; item: string[] }[] = [
  {
    title: "모두의 시간은 소중해요",
    item: [
      "매치가 정시에 시작할 수 있도록 10분 전에 도착해요",
      "늦을 때는 미리 알려줘요",
    ],
  },
  {
    title: "이타적인 플레이를 해요",
    item: [
      "긴 드리블보다 패스를 주고받으며 플레이를 만들어요",
      "모든 포지션에서 열심히 뛰어요",
    ],
  },
  {
    title: "실력, 성별 상관없이 모두 즐거워요",
    item: [
      "실력에 상관없이 함께 플레이를 만들어요",
      "상대팀의 멋진 득점에 존중의 박수를 보내요",
      "혼자 오는 사람들이 소외되지 않도록 친분을 과도하게 드러내지 않아요",
    ],
  },
  {
    title: "서로를 응원하고 존중해요",
    item: [
      "존댓말로 대화해요",
      "힘을 불어넣는 긍정적인 콜을 해요",
      "서로에게 지시하지 않아요",
    ],
  },
  {
    title: "다치지 않고 건강하게 즐겨요",
    item: ["축구화를 신거나 운동화를 신어요", "파울을 하면 잠시 경기를 멈춰요"],
  },
];

export default function MagazineScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="px-4 py-2 pb-8" space="xl">
          <VStack space="xs" className="items-center">
            <AppText size="sm" weight="medium" className="text-gray-400">
              대소고 FC
            </AppText>
            <AppText size="lg" weight="bold" className="text-black">
              밥축 문화 가이드
            </AppText>
            <AppText size="sm" weight="medium" className="text-gray-400">
              존중하고 격려하고 함께 즐겨요
            </AppText>
          </VStack>
          <Image
            source={require("@/assets/icons/banner.png")}
            className="w-full h-64 mt-4 rounded-2xl"
            resizeMode="cover"
          />
          <TitleCard />
          <VStack space="md">
            {GUIDE.map((guide) => (
              <MagazineCard
                key={guide.title}
                title={guide.title}
                item={guide.item}
              />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
