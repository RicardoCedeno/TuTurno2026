export interface IResponse<T> {
  success: boolean;
  errors: string[];
  data: T;
}