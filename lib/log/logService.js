import { Logger } from 'tslog';
import { injectAppConfig } from 'config';
import { LogLevel } from './logLevel';
// TODO: think over scoping log service and services generally
// singletons are not always good approach
export class LogService {
    // TODO : think of how to make it really abstract and
    // support mail notification and event bus log pushes
    constructor() {
        this.config = {};
        if (!LogService.instance) {
            injectAppConfig().bind('log', this.config);
            this.tslog = new Logger({
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
            case LogLevel.DEBUG:
                this.debug(...data);
                return;
            case LogLevel.ERROR:
                this.error(...data);
                return;
            case LogLevel.FATAL:
                this.fatal(...data);
                return;
            case LogLevel.INFO:
                this.info(...data);
                return;
            case LogLevel.TRACE:
                this.trace(...data);
                return;
            case LogLevel.WARN:
                this.warning(...data);
                return;
        }
    }
    trace(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(LogLevel.TRACE))
            this.tslog.trace(...data);
    }
    info(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(LogLevel.INFO))
            this.tslog.info(...data);
    }
    warning(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(LogLevel.WARN))
            this.tslog.warn(...data);
    }
    debug(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(LogLevel.DEBUG))
            this.tslog.debug(...data);
    }
    error(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(LogLevel.ERROR))
            this.tslog.error(...data);
    }
    fatal(...data) {
        var _a;
        if ((_a = this.config.console) === null || _a === void 0 ? void 0 : _a.includes(LogLevel.FATAL))
            this.tslog.fatal(...data);
    }
}
