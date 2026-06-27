import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primary: "#3366ff",
  foreground: "#191f28",
  muted: "#8b95a1",
  line: "#e5e8eb",
};

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password" | "number";
  maxLength?: number;
  inputMode?: "numeric" | "text" | "decimal";
};

export function Input({
  label,
  value,
  onChange,
  type = "text",
  maxLength,
  inputMode,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);

  const isPassword = type === "password";
  const isActive = focused || value.length > 0;

  // label floats up when active; underline grows on focus.
  const labelAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const focusAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isActive ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [labelAnim, isActive]);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: focused ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [focusAnim, focused]);

  return (
    <View style={{ position: "relative", height: 60 }}>
      {/* Floating label: resting over the input (top 34) → floated up (top 6). */}
      <Animated.Text
        pointerEvents="none"
        className="font-rocket"
        style={{
          position: "absolute",
          left: 0,
          top: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [34, 6],
          }),
          fontSize: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
          }),
          color: focused ? COLORS.primary : COLORS.muted,
        }}
      >
        {label}
      </Animated.Text>

      {/* Input sits at the bottom; 36px tall box keeps text clear of the line. */}
      <TextInput
        value={value}
        onChangeText={onChange}
        maxLength={maxLength}
        secureTextEntry={isPassword && !show}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={
          type === "number" || inputMode === "numeric" ? "numeric" : "default"
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="font-rocket"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 36,
          paddingVertical: 0,
          paddingRight: 28,
          fontSize: 16,
          color: COLORS.foreground,
        }}
      />

      {isPassword ? (
        <Pressable
          onPress={() => setShow((s) => !s)}
          hitSlop={8}
          style={{ position: "absolute", right: 0, bottom: 8 }}
        >
          <Ionicons
            name={show ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={COLORS.muted}
          />
        </Pressable>
      ) : null}

      {/* Underline: static gray + animated blue (grows on focus). */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          backgroundColor: COLORS.line,
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 2,
          backgroundColor: COLORS.primary,
          width: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
        }}
      />
    </View>
  );
}

export default Input;
