import { Image, Pressable } from "react-native";

import { AppText } from "@/components/AppText";
import { VStack } from "@/components/ui/vstack";
import type { ChoiceIcon } from "@/shared/constants/profileOptions";

type ChoiceCardProps = {
  label: string;
  icon: ChoiceIcon;
  selected: boolean;
  onPress: () => void;
};

export function ChoiceCard({ label, icon, selected, onPress }: ChoiceCardProps) {
  return (
    <Pressable onPress={onPress} className="flex-1 active:opacity-80">
      <VStack
        space="sm"
        className={`items-center rounded-2xl border-2 px-3 py-5 ${
          selected
            ? "border-primary bg-primary/5"
            : "border-background-100 bg-background-100"
        }`}
      >
        {icon.kind === "svg" ? (
          <icon.Svg width={40} height={40} />
        ) : (
          <Image
            source={icon.src}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
        )}
        <AppText
          weight={selected ? "bold" : "medium"}
          className={selected ? "text-primary" : "text-foreground"}
        >
          {label}
        </AppText>
      </VStack>
    </Pressable>
  );
}

export default ChoiceCard;
