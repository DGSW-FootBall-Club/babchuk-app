export type GenderType = "MALE" | "FEMALE";

export type SkillType = "BEGINNER" | "INTERMEDIATE" | "EXPERT";

// 매치 상태. 웹(실제 백엔드 기준)과 동일하게 OPEN/CLOSED/FINISHED 사용.
export type MatchStatus = "OPEN" | "CLOSED" | "FINISHED";

// 상태값 -> 화면에 보여줄 한글 라벨
export const MatchStatusLabel: Record<MatchStatus, string> = {
  OPEN: "모집 중",
  CLOSED: "모집 마감",
  FINISHED: "경기 종료",
};

// 상태값 -> 배지 색상(NativeWind 클래스). 모집중=초록, 마감=빨강, 종료=회색
export const statusStyle: Record<MatchStatus, string> = {
  OPEN: "bg-success",
  CLOSED: "bg-danger",
  FINISHED: "bg-muted-foreground",
};
