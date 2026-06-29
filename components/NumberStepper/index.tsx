import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppText } from "@/components/AppText";
import { HStack } from "@/components/ui/hstack";

type NumberStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string; // 값 뒤에 붙일 단위 (예: "명")
};

// 원형 +/− 버튼
function StepButton({
  icon,
  onPress,
  disabled,
}: {
  icon: "add" | "remove";
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`h-9 w-9 items-center justify-center rounded-full bg-background ${
        disabled ? "opacity-30" : "active:opacity-60"
      }`}
    >
      <Ionicons name={icon} size={20} color="#191f28" />
    </Pressable>
  );
}

// 숫자를 ± 버튼으로 조절하는 입력. (팀 인원처럼 step=2 같은 것도 가능)
export function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  suffix,
}: NumberStepperProps) {
  return (
    <HStack className="items-center justify-between rounded-2xl bg-background-100 px-4 py-2.5">
      <StepButton
        icon="remove"
        onPress={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
      />
      <AppText size="lg" weight="bold" className="text-foreground">
        {value > 0 ? `${value}${suffix ?? ""}` : "-"}
      </AppText>
      <StepButton
        icon="add"
        onPress={() => onChange(Math.min(max, value + step))}
        disabled={value >= max}
      />
    </HStack>
  );
}

export default NumberStepper;
