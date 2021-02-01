"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectHttpClient = exports.injectHttpClientConfig = void 0;
var config_1 = require("config");
var httpClient_1 = require("./httpClient");
var injectHttpClientConfig = function (clientName) {
    var appConfig = config_1.injectAppConfig();
    var config = {};
    appConfig.bind(clientName !== null && clientName !== void 0 ? clientName : 'http', config);
    return config;
};
exports.injectHttpClientConfig = injectHttpClientConfig;
var injectHttpClient = function (name) {
    var config = exports.injectHttpClientConfig(name);
    var client = new httpClient_1.HttpClient();
    client.config = config;
    return client;
};
exports.injectHttpClient = injectHttpClient;
