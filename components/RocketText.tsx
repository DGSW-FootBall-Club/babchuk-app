import { Text } from "react-native";

// On RN Text (not gluestack Text) so a passed color className always wins.
type RocketTextProps = React.ComponentProps<typeof Text>;

export function RocketText({ className, ...props }: RocketTextProps) {
  return <Text className={`font-rocket ${className ?? ""}`} {...props} />;
}

export default RocketText;
