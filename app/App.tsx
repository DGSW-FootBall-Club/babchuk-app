import "@/global.css";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import RootTabs from "@/navigation/RootTabs";

export type RootStackParamList = {
  Tabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Rocket: require("@/assets/fonts/Rocket.otf"),
    "Pretendard-Regular": require("@/assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Medium": require("@/assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-SemiBold": require("@/assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Bold": require("@/assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-ExtraBold": require("@/assets/fonts/Pretendard-ExtraBold.otf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={RootTabs} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
