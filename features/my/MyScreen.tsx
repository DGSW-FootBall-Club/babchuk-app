import { Header } from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Header title="마이" />
    </SafeAreaView>
  );
}
