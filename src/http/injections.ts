import { injectAppConfig } from 'src/config';
import { HttpClient } from './httpClient';
import { IHttpClientConfig } from './httpClientConfig';

export const injectHttpClientConfig = (
  clientName?: string,
): IHttpClientConfig => {
  const appConfig = injectAppConfig();
  const config: IHttpClientConfig = {};
  appConfig.bind(clientName ?? 'http', config);

  return config;
};

export const injectHttpClient = (name?: string): HttpClient => {
  const config = injectHttpClientConfig(name);
  const client = new HttpClient();

  client.config = config;

  return client;
};
