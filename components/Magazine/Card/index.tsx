import RocketText from "@/components/RocketText";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { AppText } from "@/components/AppText";

type MagazineCardProps = {
  title: string;
  item: string[];
};

export const MagazineCard = ({ title, item }: MagazineCardProps) => {
  return (
    <VStack className="p-4 bg-subtle rounded-2xl" space="md">
      <RocketText className="text-lg text-black">{title}</RocketText>
      <VStack space="xs">
        {item.map((text, index) => (
          <HStack key={index} space="sm" className="items-center">
            <Box className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <AppText key={index} className="text-sm text-black">
              {text}
            </AppText>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
