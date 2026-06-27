import { Pressable } from "react-native";

import { AppText } from "@/components/AppText";

type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
};

export function Button({ children, onPress, disabled }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`h-14 w-full items-center justify-center rounded-2xl bg-foreground ${
        disabled ? "opacity-40" : ""
      }`}
      style={({ pressed }) =>
        pressed && !disabled
          ? { transform: [{ scale: 0.98 }], opacity: 0.9 }
          : undefined
      }
    >
      <AppText weight="semibold" className="text-background">
        {children}
      </AppText>
    </Pressable>
  );
}

export default Button;
