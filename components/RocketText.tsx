import { Text } from "@/components/ui/text";

type RocketTextProps = React.ComponentProps<typeof Text>;

export function RocketText({ className, ...props }: RocketTextProps) {
  return <Text className={`font-rocket ${className ?? ""}`} {...props} />;
}

export default RocketText;
