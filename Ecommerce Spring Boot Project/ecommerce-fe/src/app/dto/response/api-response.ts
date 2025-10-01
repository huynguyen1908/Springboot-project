export interface ApiResponse<T> {
  code: number;
  field?: string;
  message: string;
  data: T;
}
