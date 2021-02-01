"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notImplemented = exports.internalServerError = exports.notAllowed = exports.notFount = exports.forbidden = exports.unauthorized = exports.badRequest = exports.accepted = exports.created = exports.success = exports.setStatus = void 0;
var core_1 = require("../../core");
// high-order HttpHandler general for other specific status code setters
var setStatus = function (status) { return function (context) {
    context.response.status(status);
}; };
exports.setStatus = setStatus;
// 2XX
exports.success = exports.setStatus(core_1.StatusCode.SUCCESS);
exports.created = exports.setStatus(core_1.StatusCode.CREATED);
exports.accepted = exports.setStatus(core_1.StatusCode.ACCEPTED);
// 4XX
exports.badRequest = exports.setStatus(core_1.StatusCode.BAD_REQUEST);
exports.unauthorized = exports.setStatus(core_1.StatusCode.UNAUTHORIZED);
exports.forbidden = exports.setStatus(core_1.StatusCode.FORBIDDEN);
exports.notFount = exports.setStatus(core_1.StatusCode.NOT_FOUND);
exports.notAllowed = exports.setStatus(core_1.StatusCode.METHOD_NOT_ALLOWED);
// 5XX
exports.internalServerError = exports.setStatus(core_1.StatusCode.INTERNAL_SERVER_ERROR);
exports.notImplemented = exports.setStatus(core_1.StatusCode.NOT_IMPLEMENTED);
