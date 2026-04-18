export interface ResponseDto<T> {
    success: boolean;
    errors: string[];
    data?: T;
}