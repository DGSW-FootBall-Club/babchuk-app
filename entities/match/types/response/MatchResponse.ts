import { UserResponse } from '@/entities/user/types/response/UserResponse'
import { MatchStatus } from '@/entities/common/Enum'

export interface MatchListResponse {
  id: number
  title: string
  matchDate: string
  matchTime: string
  teamSize: number
  durationMinutes: number
  teamACaptain: UserResponse
  teamBCaptain: UserResponse
  status: MatchStatus
}

export interface TeamResponse {
  captain: UserResponse
  members: UserResponse[]
  currentSize: number
}

export interface MatchDetailResponse {
  id: number
  title: string
  matchDate: string
  matchTime: string
  teamSize: number
  durationMinutes: number
  status: MatchStatus
  teamA: TeamResponse
  teamB: TeamResponse
}