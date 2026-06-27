import { GenderType, SkillType } from "@/entities/common/Enum"

export interface UserResponse {
  id: number
  studentId: string
  name: string
  profileImage: string | null
  role: string
  grade: number
  room: number
  number: number
  skillType: SkillType | null
  gender: GenderType | null
}
