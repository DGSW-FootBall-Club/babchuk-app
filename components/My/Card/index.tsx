import { Image, Pressable, type ImageSourcePropType } from "react-native";
import type { SvgProps } from "react-native-svg";

import AppText from "@/components/AppText";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { UserResponse } from "@/entities/user/types/response/UserResponse";
import type { GenderType, SkillType } from "@/entities/common/Enum";

// beginner/intermediate are clean vector SVGs. expert/male/female were raster
// images embedded in an SVG <pattern>, which react-native-svg clips/mis-renders
// — so those use the extracted PNGs via <Image> instead.
import Beginner from "@/assets/icons/beginner.svg";
import Intermediate from "@/assets/icons/intermediate.svg";

type IconInfo =
  | { kind: "svg"; Svg: React.FC<SvgProps>; label: string }
  | { kind: "png"; src: ImageSourcePropType; label: string };

const GENDER_MAP: Record<GenderType, IconInfo> = {
  MALE: {
    kind: "png",
    src: require("@/assets/icons/png/male.png"),
    label: "남자",
  },
  FEMALE: {
    kind: "png",
    src: require("@/assets/icons/png/female.png"),
    label: "여자",
  },
};

const SKILL_MAP: Record<SkillType, IconInfo> = {
  BEGINNER: { kind: "svg", Svg: Beginner, label: "초보" },
  INTERMEDIATE: { kind: "svg", Svg: Intermediate, label: "중수" },
  EXPERT: {
    kind: "png",
    src: require("@/assets/icons/png/expert.png"),
    label: "고수",
  },
};

const Icon = ({ info, size = 28 }: { info: IconInfo; size?: number }) =>
  info.kind === "svg" ? (
    <info.Svg width={size} height={size} />
  ) : (
    <Image
      source={info.src}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );

type InfoCardProps = { label: string; info: IconInfo | null };

const InfoCard = ({ label, info }: InfoCardProps) => (
  <VStack space="sm" className="flex-1 px-4 py-4 rounded-2xl bg-background-100">
    <AppText size="sm" className="text-muted-foreground">
      {label}
    </AppText>
    {info ? (
      <HStack space="sm" className="items-center">
        <Icon info={info} />
        <AppText size="xl" weight="bold" className="text-foreground">
          {info.label}
        </AppText>
      </HStack>
    ) : (
      <AppText size="xl" weight="bold" className="text-muted-foreground">
        미설정
      </AppText>
    )}
  </VStack>
);

type MyCardProps = { user: UserResponse };

export const MyCard = ({ user }: MyCardProps) => {
  const gender = user.gender ? GENDER_MAP[user.gender] : null;
  const skill = user.skillType ? SKILL_MAP[user.skillType] : null;

  return (
    <VStack space="md">
      <HStack space="md" className="items-center">
        <Image
          source={
            user.profileImage
              ? { uri: user.profileImage }
              : require("@/assets/icons/profile.png")
          }
          style={{ width: 72, height: 72, borderRadius: 36 }}
          resizeMode="cover"
        />
        <AppText size="2xl" weight="bold" className="text-foreground">
          {user.name}
        </AppText>
        <Box className="flex-1" />
        <Pressable className="px-4 py-2 border rounded-xl border-background-200 active:opacity-60">
          <AppText size="sm" weight="medium" className="text-body">
            프로필 수정
          </AppText>
        </Pressable>
      </HStack>

      {/* 성별 · 축구 실력 */}
      <HStack space="md">
        <InfoCard label="성별" info={gender} />
        <InfoCard label="축구 실력" info={skill} />
      </HStack>

      {/* 학번 */}
      <VStack space="xs" className="px-5 py-5 rounded-2xl bg-primary">
        <AppText size="sm" className="text-white/70">
          학번
        </AppText>
        <AppText size="3xl" weight="bold" className="text-white">
          {user.grade}학년 {user.room}반 {user.number}번
        </AppText>
      </VStack>
    </VStack>
  );
};
