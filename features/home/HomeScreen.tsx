import { SafeAreaView } from "react-native-safe-area-context";

import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { AppText } from "@/components/AppText";
import { RocketText } from "@/components/RocketText";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Center className="flex-1">
        <VStack space="md" className="items-center">
          {/* Pretendard 무게별 */}
          <AppText size="2xl" weight="extrabold" className="text-typography-900">
            밥축 ExtraBold
          </AppText>
          <AppText size="xl" weight="bold">
            밥축 Bold
          </AppText>
          <AppText size="lg" weight="semibold">
            밥축 SemiBold
          </AppText>
          <AppText size="md" weight="medium">
            밥축 Medium
          </AppText>
          <AppText size="md" weight="regular" className="text-typography-500">
            밥축 Regular (기본)
          </AppText>

          {/* a로케트 폰트 적용 */}
          <RocketText className="text-3xl text-black">밥축 ROCKET</RocketText>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}
