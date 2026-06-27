import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/Header";

export default function NoticeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Header title="공지사항" />
    </SafeAreaView>
  );
}
