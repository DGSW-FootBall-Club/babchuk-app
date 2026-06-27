import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "@/features/auth/signin/LoginScreen";
import SignupScreen from "@/features/auth/signup/SignupScreen";

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;