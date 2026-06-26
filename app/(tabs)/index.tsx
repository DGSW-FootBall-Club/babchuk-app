import { SafeAreaView } from "react-native-safe-area-context";

import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { RocketText } from "@/components/RocketText";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Center className="flex-1">
        <VStack space="lg" className="items-center">
          {/* 기본 폰트 */}
          <Heading size="2xl" className="text-typography-900">
            밥축
          </Heading>
          <Text className="text-typography-500">기본 폰트 (default)</Text>

          {/* a로케트 폰트 적용 */}
          <RocketText className="text-5xl text-black">
            밥축 ROCKET
          </RocketText>
          <RocketText className="text-base text-typography-500">
            a로케트 폰트로 렌더링된 텍스트입니다
          </RocketText>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}
