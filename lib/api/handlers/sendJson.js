"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJson = void 0;
const exception_1 = require("src/exception");
const sendJson = (body) => (context) => {
    if (context.finished)
        throw exception_1.Exception.api()
            .withMessage('Cannot send json as request is already finished')
            .from('SendJson');
    context.response.json(body);
    context.finished = true;
};
exports.sendJson = sendJson;
