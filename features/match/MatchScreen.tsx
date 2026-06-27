import { SafeAreaView } from "react-native-safe-area-context";

import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function MatchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Center className="flex-1">
        <Heading size="2xl" className="text-typography-900">
          매치생성
        </Heading>
        <Text className="text-typography-500">매치생성 화면</Text>
      </Center>
    </SafeAreaView>
  );
}
