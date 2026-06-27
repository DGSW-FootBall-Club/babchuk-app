import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#9ca3af",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "홈",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notice"
        component={NoticeScreen}
        options={{
          title: "공지사항",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "megaphone" : "megaphone-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Match"
        component={MatchScreen}
        options={{
          title: "매치생성",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          title: "일정",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
          title: "MY",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
