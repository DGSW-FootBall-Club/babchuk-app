import { SafeAreaView } from "react-native-safe-area-context";

import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function MyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Center className="flex-1">
        <Heading size="2xl" className="text-typography-900">
          마이
        </Heading>
        <Text className="text-typography-500">마이 화면</Text>
      </Center>
    </SafeAreaView>
  );
}
