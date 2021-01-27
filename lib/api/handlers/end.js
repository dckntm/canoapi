"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = void 0;
const log_1 = require("src/log");
const end = (context) => {
    const log = log_1.injectLogService();
    context.response.end(() => log.info(`Request ${context.request.method} ${context.request.url} ended`));
};
exports.end = end;
