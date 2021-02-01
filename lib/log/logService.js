"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
var tslog_1 = require("tslog");
var config_1 = require("../config");
var logLevel_1 = require("./logLevel");
// TODO: think over scoping log service and services generally
// singletons are not always good approach
var LogService = /** @class */ (function () {
    // TODO : think of how to make it really abstract and
    // support mail notification and event bus log pushes
    function LogService() {
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
    LogService.getInstance = function () {
        if (!this.instance) {
            return new this();
        }
        return this.instance;
    };
    LogService.prototype.log = function (level) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        switch (level) {
            case logLevel_1.LogLevel.DEBUG:
                this.debug.apply(this, __spread(data));
                return;
            case logLevel_1.LogLevel.ERROR:
                this.error.apply(this, __spread(data));
                return;
            case logLevel_1.LogLevel.FATAL:
                this.fatal.apply(this, __spread(data));
                return;
            case logLevel_1.LogLevel.INFO:
                this.info.apply(this, __spread(data));
                return;
            case logLevel_1.LogLevel.TRACE:
                this.trace.apply(this, __spread(data));
                return;
            case logLevel_1.LogLevel.WARN:
                this.warning.apply(this, __spread(data));
                return;
        }
    };
    LogService.prototype.trace = function () {
        var _a;
        var _b;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if ((_b = this.config.console) === null || _b === void 0 ? void 0 : _b.includes(logLevel_1.LogLevel.TRACE))
            (_a = this.tslog).trace.apply(_a, __spread(data));
    };
    LogService.prototype.info = function () {
        var _a;
        var _b;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if ((_b = this.config.console) === null || _b === void 0 ? void 0 : _b.includes(logLevel_1.LogLevel.INFO))
            (_a = this.tslog).info.apply(_a, __spread(data));
    };
    LogService.prototype.warning = function () {
        var _a;
        var _b;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if ((_b = this.config.console) === null || _b === void 0 ? void 0 : _b.includes(logLevel_1.LogLevel.WARN))
            (_a = this.tslog).warn.apply(_a, __spread(data));
    };
    LogService.prototype.debug = function () {
        var _a;
        var _b;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if ((_b = this.config.console) === null || _b === void 0 ? void 0 : _b.includes(logLevel_1.LogLevel.DEBUG))
            (_a = this.tslog).debug.apply(_a, __spread(data));
    };
    LogService.prototype.error = function () {
        var _a;
        var _b;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if ((_b = this.config.console) === null || _b === void 0 ? void 0 : _b.includes(logLevel_1.LogLevel.ERROR))
            (_a = this.tslog).error.apply(_a, __spread(data));
    };
    LogService.prototype.fatal = function () {
        var _a;
        var _b;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if ((_b = this.config.console) === null || _b === void 0 ? void 0 : _b.includes(logLevel_1.LogLevel.FATAL))
            (_a = this.tslog).fatal.apply(_a, __spread(data));
    };
    return LogService;
}());
exports.LogService = LogService;
