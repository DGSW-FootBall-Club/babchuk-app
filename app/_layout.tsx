import { Stack } from "expo-router";
import { useFonts } from "expo-font";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // key "Rocket" becomes the fontFamily name (maps to className "font-rocket")
    Rocket: require("@/assets/fonts/Rocket.otf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GluestackUIProvider>
  );
}
