import { Header } from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MatchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Header title="매치생성"/>
    </SafeAreaView>
  );
}
