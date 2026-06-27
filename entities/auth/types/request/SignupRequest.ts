export interface SignupRequest {
  username: string;
  password: string;
  name: string;
  grade: number;
  room: number;
  number: number;
  profileImage?: string;
}
