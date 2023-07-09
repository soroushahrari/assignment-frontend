export interface IApiResponse {
    isSuccess: boolean;
    data?: any;
    message: string;
    error?: string;
    errorCode?: number;
}