import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";

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

export default function RootTabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#000000" }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "홈",
          tabBarIcon: ({ focused }) => ({
            type: "sfSymbol",
            name: focused ? "house.fill" : "house",
          }),
        }}
      />
      <Tab.Screen
        name="Notice"
        component={NoticeScreen}
        options={{
          title: "공지사항",
          tabBarIcon: ({ focused }) => ({
            type: "sfSymbol",
            name: focused ? "megaphone.fill" : "megaphone",
          }),
        }}
      />
      <Tab.Screen
        name="Match"
        component={MatchScreen}
        options={{
          title: "매치생성",
          tabBarIcon: ({ focused }) => ({
            type: "sfSymbol",
            name: focused ? "plus.circle.fill" : "plus.circle",
          }),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          title: "일정",
          tabBarIcon: { type: "sfSymbol", name: "calendar" },
        }}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
          title: "MY",
          tabBarIcon: ({ focused }) => ({
            type: "sfSymbol",
            name: focused ? "person.fill" : "person",
          }),
        }}
      />
    </Tab.Navigator>
  );
}
