import "@/global.css";

import { ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  type NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import RootTabs, { type RootTabParamList } from "@/navigation/RootTabs";
import MagazineScreen from "@/features/magazine/MagazineScreen";
import OnboardingScreen from "@/features/auth/onboarding/OnboardingScreen";
import { AuthStack } from "@/navigation/AuthStack";
import { useTokenStore } from "@/shared/store/tokenStore";
import { useMyInfo } from "@/features/my/hooks/useMyInfo";

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<RootTabParamList>;
  Magazine: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

function MainNavigator() {
  const { data: me, isLoading } = useMyInfo();

  if (isLoading && !me) {
    return (
      <View className="items-center justify-center flex-1 bg-background">
        <ActivityIndicator />
      </View>
    );
  }

  const needsOnboarding = !!me && (me.gender == null || me.skillType == null);

  if (needsOnboarding) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={RootTabs} />
      <Stack.Screen name="Magazine" component={MagazineScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Rocket: require("@/assets/fonts/Rocket.otf"),
    "Pretendard-Regular": require("@/assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Medium": require("@/assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-SemiBold": require("@/assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Bold": require("@/assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-ExtraBold": require("@/assets/fonts/Pretendard-ExtraBold.otf"),
  });

  const token = useTokenStore((s) => s.token);
  const hydrated = useTokenStore((s) => s.hydrated);

  const fontsReady = fontsLoaded || fontError;
  if (!fontsReady || !hydrated) {
    return (
      <GluestackUIProvider mode="light">
        <View className="items-center justify-center flex-1 bg-background">
          <ActivityIndicator />
        </View>
      </GluestackUIProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <SafeAreaProvider>
          <NavigationContainer>
            {token == null ? <AuthStack /> : <MainNavigator />}
          </NavigationContainer>
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
