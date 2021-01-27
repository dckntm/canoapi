"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectLogService = void 0;
const logService_1 = require("./logService");
const injectLogService = () => logService_1.LogService.getInstance();
exports.injectLogService = injectLogService;
