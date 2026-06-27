import { View } from "react-native";
import { HStack } from "../ui/hstack";
import RocketText from "../RocketText";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <View className="justify-start px-4 py-2">
      <HStack>
        <RocketText className="text-3xl text-black">{title}</RocketText>
      </HStack>
    </View>
  );
};
