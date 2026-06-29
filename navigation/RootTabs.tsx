import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  View,
  type ImageSourcePropType,
} from "react-native";
import {
  createNativeBottomTabNavigator,
  type NativeBottomTabIcon,
} from "@react-navigation/bottom-tabs/unstable";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "@/features/home/HomeScreen";
import NoticeScreen from "@/features/notice/NoticeScreen";
import MatchScreen from "@/features/match/MatchScreen";
import ScheduleScreen from "@/features/schedule/ScheduleScreen";
import MyScreen from "@/features/my/MyScreen";

export type RootTabParamList = {
  Home: undefined;
  Notice: undefined;
  Match: undefined;
  Schedule: undefined;
  My: undefined;
};

const Tab = createNativeBottomTabNavigator<RootTabParamList>();

// 탭별 아이콘 정의.
//  - iOS  : SF Symbol (네이티브 플로팅 탭바 + 포커스 시 채워진 아이콘으로 전환)
//  - 안드로이드 : SF Symbol을 못 쓰므로 Ionicons 이름 → 아래서 이미지로 변환해 사용
const TAB_ICONS: Record<
  keyof RootTabParamList,
  { iosOn: string; iosOff: string; ion: keyof typeof Ionicons.glyphMap }
> = {
  Home: { iosOn: "house.fill", iosOff: "house", ion: "home" },
  Notice: { iosOn: "megaphone.fill", iosOff: "megaphone", ion: "megaphone" },
  Match: { iosOn: "plus.circle.fill", iosOff: "plus.circle", ion: "add-circle" },
  Schedule: { iosOn: "calendar", iosOff: "calendar", ion: "calendar" },
  My: { iosOn: "person.fill", iosOff: "person", ion: "person" },
};

const isIOS = Platform.OS === "ios";

export default function RootTabs() {
  // 안드로이드용: Ionicons 글리프를 이미지 소스로 변환해 보관.
  // (네이티브 탭바가 active/inactive 색으로 자동 틴트하므로 단색 1장이면 충분)
  const [androidIcons, setAndroidIcons] = useState<Record<
    string,
    ImageSourcePropType
  > | null>(isIOS ? {} : null);

  useEffect(() => {
    if (isIOS) return;
    let alive = true;
    (async () => {
      const keys = Object.keys(TAB_ICONS) as (keyof RootTabParamList)[];
      const entries = await Promise.all(
        keys.map(async (key) => {
          const src = await Ionicons.getImageSource(
            TAB_ICONS[key].ion,
            24,
            "#000000",
          );
          return [key, src as unknown as ImageSourcePropType] as const;
        }),
      );
      if (alive) setAndroidIcons(Object.fromEntries(entries));
    })();
    return () => {
      alive = false;
    };
  }, []);

  // 안드로이드에서 아이콘 변환이 끝나기 전 잠깐(보통 한 번, 수십 ms) 로딩 표시
  if (androidIcons == null) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator />
      </View>
    );
  }

  // 플랫폼별로 적절한 아이콘 객체를 만들어주는 헬퍼.
  // (SF Symbol 이름은 라이브러리가 엄격한 유니온 타입이라 NativeBottomTabIcon으로 캐스팅)
  const iconFor = (
    key: keyof RootTabParamList,
    focused: boolean,
  ): NativeBottomTabIcon =>
    isIOS
      ? ({
          type: "sfSymbol",
          name: focused ? TAB_ICONS[key].iosOn : TAB_ICONS[key].iosOff,
        } as NativeBottomTabIcon)
      : { type: "image", source: androidIcons[key] };

  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#000000" }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "홈",
          tabBarIcon: ({ focused }) => iconFor("Home", focused),
        }}
      />
      <Tab.Screen
        name="Notice"
        component={NoticeScreen}
        options={{
          title: "공지사항",
          tabBarIcon: ({ focused }) => iconFor("Notice", focused),
        }}
      />
      <Tab.Screen
        name="Match"
        component={MatchScreen}
        options={{
          title: "매치생성",
          tabBarIcon: ({ focused }) => iconFor("Match", focused),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          title: "일정",
          tabBarIcon: ({ focused }) => iconFor("Schedule", focused),
        }}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
          title: "MY",
          tabBarIcon: ({ focused }) => iconFor("My", focused),
        }}
      />
    </Tab.Navigator>
  );
}
