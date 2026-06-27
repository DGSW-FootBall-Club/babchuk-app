import { Text } from "react-native";
import { tva } from "@gluestack-ui/utils/nativewind-utils";

// Built directly on RN Text (not gluestack Text) so a passed `className` color
// always wins — gluestack Text injects a `text-typography-700` base that can
// override it. `weight` maps to the Pretendard font families.
const appTextStyle = tva({
  base: "text-foreground",
  variants: {
    weight: {
      regular: "font-pretendard",
      medium: "font-pretendard-medium",
      semibold: "font-pretendard-semibold",
      bold: "font-pretendard-bold",
      extrabold: "font-pretendard-extrabold",
    },
    size: {
      "2xs": "text-2xs",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
  },
  defaultVariants: {
    weight: "regular",
    size: "md",
  },
});

type AppTextProps = React.ComponentProps<typeof Text> & {
  weight?: "regular" | "medium" | "semibold" | "bold" | "extrabold";
  size?:
    | "2xs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
};

export function AppText({ weight, size, className, ...props }: AppTextProps) {
  return (
    <Text className={appTextStyle({ weight, size, class: className })} {...props} />
  );
}

export default AppText;
