import { TouchableOpacity, View } from "react-native";
import { HStack } from "../ui/hstack";
import { useNavigation } from "@react-navigation/native";
import AppText from "../AppText";
import { Feather } from "@expo/vector-icons";

export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View className="justify-start px-4 py-2">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex-row items-center"
      >
        <HStack space="xs" className="items-center">
          <Feather name="chevron-left" size={24} color="black" />
          <AppText size="md" weight="bold" className="text-typography-900">
            뒤로가기
          </AppText>
        </HStack>
      </TouchableOpacity>
    </View>
  );
};
