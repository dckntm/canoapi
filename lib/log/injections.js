"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectLogService = void 0;
var logService_1 = require("./logService");
var injectLogService = function () { return logService_1.LogService.getInstance(); };
exports.injectLogService = injectLogService;
