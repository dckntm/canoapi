import { injectAppConfig } from '../config';
import { HttpClient } from './httpClient';
import { DefaultHttpClientConfig, IHttpClientConfig } from './httpClientConfig';

export const injectHttpClientConfig = (
  clientName?: string,
): IHttpClientConfig => {
  const appConfig = injectAppConfig();
  const config = DefaultHttpClientConfig;
  
  appConfig.bind(clientName ?? 'http', config);

  return config;
};

export const injectHttpClient = (name?: string): HttpClient => {
  const config = injectHttpClientConfig(name);
  const client = new HttpClient();

  client.config = config;

  return client;
};
