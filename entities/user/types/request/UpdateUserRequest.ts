import { GenderType, SkillType } from "@/entities/common/Enum";

export interface UpdateUserRequest {
  profileImage?: string;
  name?: string;
  skillType?: SkillType;
  gender?: GenderType;
}
