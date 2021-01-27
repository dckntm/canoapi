"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectHttpClient = exports.injectHttpClientConfig = void 0;
const config_1 = require("src/config");
const httpClient_1 = require("./httpClient");
const injectHttpClientConfig = (clientName) => {
    const appConfig = config_1.injectAppConfig();
    const config = {};
    appConfig.bind(clientName !== null && clientName !== void 0 ? clientName : 'http', config);
    return config;
};
exports.injectHttpClientConfig = injectHttpClientConfig;
const injectHttpClient = (name) => {
    const config = exports.injectHttpClientConfig(name);
    const client = new httpClient_1.HttpClient();
    client.config = config;
    return client;
};
exports.injectHttpClient = injectHttpClient;
