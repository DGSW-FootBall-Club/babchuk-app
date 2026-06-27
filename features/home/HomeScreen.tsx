import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { Banner } from "@/components/Banner";
import { VStack } from "@/components/ui/vstack";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-0" edges={["top"]}>
      <Header title="밥축" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          <Banner />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
