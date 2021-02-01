import { injectAppConfig } from 'config';
import { HttpClient } from './httpClient';
export const injectHttpClientConfig = (clientName) => {
    const appConfig = injectAppConfig();
    const config = {};
    appConfig.bind(clientName !== null && clientName !== void 0 ? clientName : 'http', config);
    return config;
};
export const injectHttpClient = (name) => {
    const config = injectHttpClientConfig(name);
    const client = new HttpClient();
    client.config = config;
    return client;
};
