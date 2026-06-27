export interface CreateMatchRequest {
  title: string
  matchDate: string
  matchTime: string
  teamSize: number
  durationMinutes: number
  teamACaptainId: number
  teamBCaptainId: number
}