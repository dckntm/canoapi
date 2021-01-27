"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const tslog_1 = require("tslog");
const config_1 = require("src/config");
const logLevel_1 = require("./logLevel");
// TODO: think over scoping log service and services generally
// singletons are not always good approach
class LogService {
    // TODO : think of how to make it really abstract and
    // support mail notification and event bus log pushes
    constructor() {
        this.config = {};
        if (!LogService.instance) {
            config_1.injectAppConfig().bind('log', this.config);
            this.tslog = new tslog_1.Logger({
                displayFunctionName: false,
                displayFilePath: 'hidden',
                dateTimePattern: 'year-month-day hour:minute:second',
            });
        }
        LogService.instance = this;
    }
    static getInstance() {
        if (!this.instance) {
            return new this();
        }
        return this.instance;
    }
    log(level, ...data) {
        switch (level) {
            case logLevel_1.LogLevel.DEBUG:
                this.debug(...data);
                return;
            case logLevel_1.LogLevel.ERROR:
                this.error(...data);
                return;
            case logLevel_1.LogLevel.FATAL:
                this.fatal(...data);
                return;
            case logLevel_1.LogLevel.INFO:
                this.info(...data);
                return;
            case logLevel_1.LogLevel.TRACE:
                this.trace(...data);
                return;
            case logLevel_1.LogLevel.WARN:
                this.warning(...data);
                return;
        }
    }
    trace(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(logLevel_1.LogLevel.TRACE))
            this.tslog.trace(...data);
    }
    info(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(logLevel_1.LogLevel.INFO))
            this.tslog.info(...data);
    }
    warning(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(logLevel_1.LogLevel.WARN))
            this.tslog.warn(...data);
    }
    debug(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(logLevel_1.LogLevel.DEBUG))
            this.tslog.debug(...data);
    }
    error(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(logLevel_1.LogLevel.ERROR))
            this.tslog.error(...data);
    }
    fatal(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(logLevel_1.LogLevel.FATAL))
            this.tslog.fatal(...data);
    }
}
exports.LogService = LogService;
