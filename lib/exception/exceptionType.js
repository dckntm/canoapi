"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionType = void 0;
var ExceptionType;
(function (ExceptionType) {
    // this errors are for failed connections and inner lib problems
    ExceptionType["INTERNAL"] = "INTERNAL";
    // this errors are for situations when business logic failed to perform something
    ExceptionType["BUSINESS"] = "BUSINESS";
    // this errors are for api layer when we fail to do something on api layer
    ExceptionType["API"] = "API";
})(ExceptionType = exports.ExceptionType || (exports.ExceptionType = {}));
