export type SkillType = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
export type GenderType = 'MALE' | 'FEMALE'
export type MatchStatus = 'OPEN' | 'CLOSED' | 'FINISHED'

export const SkillTypeLabel = {
  BEGINNER: '초급',
  INTERMEDIATE: '중급',
  EXPERT: '고수',
} as const

export const GenderTypeLabel = {
  MALE: '남자',
  FEMALE: '여자',
} as const

export const MatchStatusLabel = {
  OPEN: '모집 중',
  CLOSED: '모집 마감',
  FINISHED: '경기 종료',
} as const

export const statusStyle: Record<MatchStatus, string> = {
  OPEN: "bg-success text-white",
  CLOSED: "bg-danger text-white",
  FINISHED: "bg-muted-foreground text-white",
};
