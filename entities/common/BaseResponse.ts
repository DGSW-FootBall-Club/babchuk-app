// Standard API envelope: { status, message, data } (Spring BaseResponse).
export interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
}
