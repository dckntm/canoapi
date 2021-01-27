/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import { HttpMethod, StatusCode } from 'core';
import { Exception } from 'exception';
import { injectLogService } from 'log';
import { IHttpClientConfig } from './httpClientConfig';

export class HttpClient {
  public config: IHttpClientConfig = {};

  public async request<TResult = unknown>(
    url: string,
    method: HttpMethod,
    data: unknown = {},
    headers: any = {},
  ): Promise<TResult> {
    const log = injectLogService();

    try {
      log.debug(
        'Calling request',
        `${this.config.base}${url}`,
        method,
        data,
        headers,
      );

      const response = await Axios.request<TResult>({
        url: `${this.config.base}${url}`,
        method: method,
        data: data,
        headers: {
          ...this.config.defaultHeaders,
          ...headers,
        },
      });

      log.debug('Response:', response);

      if (response.status !== StatusCode.SUCCESS)
        throw Exception.internal()
          .withMessage(`Failed to make HTTP call ${this.config.base}${url}`)
          .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
          .from('HttpClient')
          .withMeta(response);

      return response.data;
    } catch (e) {
      let exception: Exception;

      if (!(e instanceof Exception))
        exception = Exception.internal()
          .withMessage(`Failed to make HTTP call ${this.config.base}${url}`)
          .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
          .from('HttpClient')
          .withMeta(e);
      else exception = e;

      throw exception;
    }
  }

  public async get<TResult = unknown>(
    url: string,
    data: unknown = {},
    headers: any = {},
  ): Promise<TResult> {
    return await this.request(url, HttpMethod.GET, data, headers);
  }

  public async post<TResult = unknown>(
    url: string,
    data: unknown = {},
    headers: any = {},
  ): Promise<TResult> {
    return await this.request(url, HttpMethod.POST, data, headers);
  }

  public async put<TResult = unknown>(
    url: string,
    data: unknown = {},
    headers: any = {},
  ): Promise<TResult> {
    return await this.request(url, HttpMethod.PUT, data, headers);
  }

  public async delete<TResult = unknown>(
    url: string,
    data: unknown = {},
    headers: any = {},
  ): Promise<TResult> {
    return await this.request(url, HttpMethod.DELETE, data, headers);
  }
}
