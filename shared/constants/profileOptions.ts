import type { FC } from "react";
import type { ImageSourcePropType } from "react-native";
import type { SvgProps } from "react-native-svg";

import type { GenderType, SkillType } from "@/entities/common/Enum";

// expert/male/female are raster (extracted PNG); beginner/intermediate are vectors.
import Beginner from "@/assets/icons/beginner.svg";
import Intermediate from "@/assets/icons/intermediate.svg";

export type ChoiceIcon =
  | { kind: "svg"; Svg: FC<SvgProps> }
  | { kind: "png"; src: ImageSourcePropType };

export type ProfileOption<T> = {
  label: string;
  value: T;
  icon: ChoiceIcon;
};

export const GENDER_OPTIONS: ProfileOption<GenderType>[] = [
  {
    label: "남자",
    value: "MALE",
    icon: { kind: "png", src: require("@/assets/icons/png/male.png") },
  },
  {
    label: "여자",
    value: "FEMALE",
    icon: { kind: "png", src: require("@/assets/icons/png/female.png") },
  },
];

export const SKILL_OPTIONS: ProfileOption<SkillType>[] = [
  { label: "초급", value: "BEGINNER", icon: { kind: "svg", Svg: Beginner } },
  {
    label: "중급",
    value: "INTERMEDIATE",
    icon: { kind: "svg", Svg: Intermediate },
  },
  {
    label: "고수",
    value: "EXPERT",
    icon: { kind: "png", src: require("@/assets/icons/png/expert.png") },
  },
];
