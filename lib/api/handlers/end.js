"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = void 0;
var log_1 = require("log");
var end = function (context) {
    var log = log_1.injectLogService();
    context.response.end(function () {
        return log.info("Request " + context.request.method + " " + context.request.url + " ended");
    });
};
exports.end = end;
