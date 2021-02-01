"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJson = void 0;
var exception_1 = require("../../exception");
var sendJson = function (body) { return function (context) {
    if (context.finished)
        throw exception_1.Exception.api()
            .withMessage('Cannot send json as request is already finished')
            .from('SendJson');
    context.response.json(body);
    context.finished = true;
}; };
exports.sendJson = sendJson;
