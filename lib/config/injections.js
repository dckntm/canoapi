"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectAppConfig = void 0;
var appConfig_1 = require("./appConfig");
var injectAppConfig = function () { return appConfig_1.AppConfig.getInstance(); };
exports.injectAppConfig = injectAppConfig;
