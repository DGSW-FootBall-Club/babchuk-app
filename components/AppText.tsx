import { tva } from "@gluestack-ui/utils/nativewind-utils";

import { Text } from "@/components/ui/text";

const appTextStyle = tva({
  variants: {
    weight: {
      regular: "font-pretendard",
      medium: "font-pretendard-medium",
      semibold: "font-pretendard-semibold",
      bold: "font-pretendard-bold",
      extrabold: "font-pretendard-extrabold",
    },
  },
  defaultVariants: {
    weight: "regular",
  },
});

type AppTextWeight = "regular" | "medium" | "semibold" | "bold" | "extrabold";

type AppTextProps = React.ComponentProps<typeof Text> & {
  weight?: AppTextWeight;
};

export function AppText({ weight, className, ...props }: AppTextProps) {
  return (
    <Text className={appTextStyle({ weight, class: className })} {...props} />
  );
}

export default AppText;
