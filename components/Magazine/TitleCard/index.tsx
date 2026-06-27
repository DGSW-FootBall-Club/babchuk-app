import { VStack } from "@/components/ui/vstack";
import RocketText from "@/components/RocketText";
import { AppText } from "@/components/AppText";

export const TitleCard = () => {
  return (
    <VStack className="p-4 bg-subtle rounded-2xl" space="md">
      <RocketText className="text-lg text-black">밥축이 뭐에요?</RocketText>
      <VStack space="xs">
        <AppText className="text-sm text-black">
          밥축은 점심, 저녁을 먹고 남은 시간에 함께 축구를 즐갈수 있어요.{"\n"}
          실력보다 즐거움을, 경쟁보다 함께하는 기쁨을 소중히 여겨요. 신청만 하면 누구든 함께할 수 있어요!
        </AppText>
      </VStack>
    </VStack>
  );
};
