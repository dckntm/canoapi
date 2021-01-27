import { HttpMethod } from 'src/core';
import { IHttpClientConfig } from './httpClientConfig';
export declare class HttpClient {
    config: IHttpClientConfig;
    request<TResult = unknown>(url: string, method: HttpMethod, data?: unknown, headers?: any): Promise<TResult>;
    get<TResult = unknown>(url: string, data?: unknown, headers?: any): Promise<TResult>;
    post<TResult = unknown>(url: string, data?: unknown, headers?: any): Promise<TResult>;
    put<TResult = unknown>(url: string, data?: unknown, headers?: any): Promise<TResult>;
    delete<TResult = unknown>(url: string, data?: unknown, headers?: any): Promise<TResult>;
}
