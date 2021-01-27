"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectAppConfig = void 0;
const appConfig_1 = require("./appConfig");
const injectAppConfig = () => appConfig_1.AppConfig.getInstance();
exports.injectAppConfig = injectAppConfig;
