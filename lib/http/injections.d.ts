import { HttpClient } from './httpClient';
import { IHttpClientConfig } from './httpClientConfig';
export declare const injectHttpClientConfig: (clientName?: string | undefined) => IHttpClientConfig;
export declare const injectHttpClient: (name?: string | undefined) => HttpClient;
