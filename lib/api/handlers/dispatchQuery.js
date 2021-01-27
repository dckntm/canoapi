"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchQueryFormValue = exports.DispatchQueryFromParams = exports.DispatchQueryFromQuery = exports.DispatchQueryFromBody = exports.DispatchQuery = void 0;
const api_1 = require("src/api");
const exception_1 = require("src/exception");
const DispatchQuery = (handler, ...source) => (context) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    source.forEach((x) => {
        switch (x) {
            case api_1.DispatchSource.BODY:
                data = Object.assign(Object.assign({}, data), context.request.body);
                return;
            case api_1.DispatchSource.PARAMS:
                data = Object.assign(Object.assign({}, data), context.request.params);
                return;
            case api_1.DispatchSource.QUERY:
                data = Object.assign(Object.assign({}, data), context.request.query);
        }
    });
    const query = data;
    if (!query)
        throw exception_1.Exception.api()
            .withMessage('Failed to read query')
            .from('DispatchQuery')
            .withMeta({
            body: context.request.body,
            params: context.request.params,
            query: context.request.query,
            data: data,
        });
    // may throw error which will be handled on the top-most level
    const result = yield handler(query);
    yield api_1.compose(api_1.success, api_1.sendJson(result))(context);
});
exports.DispatchQuery = DispatchQuery;
const DispatchQueryFromBody = (handler) => exports.DispatchQuery(handler, api_1.DispatchSource.BODY);
exports.DispatchQueryFromBody = DispatchQueryFromBody;
const DispatchQueryFromQuery = (handler) => exports.DispatchQuery(handler, api_1.DispatchSource.QUERY);
exports.DispatchQueryFromQuery = DispatchQueryFromQuery;
const DispatchQueryFromParams = (handler) => exports.DispatchQuery(handler, api_1.DispatchSource.PARAMS);
exports.DispatchQueryFromParams = DispatchQueryFromParams;
const DispatchQueryFormValue = (value, handler) => (context) => __awaiter(void 0, void 0, void 0, function* () {
    if (!value)
        throw exception_1.Exception.api()
            .withMessage('Value for query dispatch is invalid (null or undefined)')
            .from('DispatchQueryFromValue')
            .withMeta({ value: value });
    const result = yield handler(value);
    yield api_1.compose(api_1.success, api_1.sendJson(result))(context);
});
exports.DispatchQueryFormValue = DispatchQueryFormValue;
