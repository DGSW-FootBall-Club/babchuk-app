// 매치 데이터(서버는 "HH:mm", "YYYY-MM-DD" 문자열로 내려줌)를 화면용 한국어
// 문자열로 바꿔주는 포맷터들. 웹(shared/utils/formatMatch)과 동일한 규칙.

/** "14:30" -> "오후 2:30" */
export function formatMatchTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h < 12 ? "오전" : "오후";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h; // 0시/12시 처리
  return `${ampm} ${hour}:${String(m).padStart(2, "0")}`;
}

/** "2026-06-29" -> "6월 29일 월요일" */
export function formatMatchDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}요일`;
}
