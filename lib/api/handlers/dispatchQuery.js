var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { compose, DispatchSource, sendJson, success, } from 'api';
import { Exception } from 'exception';
export const DispatchQuery = (handler, ...source) => (context) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    source.forEach((x) => {
        switch (x) {
            case DispatchSource.BODY:
                data = Object.assign(Object.assign({}, data), context.request.body);
                return;
            case DispatchSource.PARAMS:
                data = Object.assign(Object.assign({}, data), context.request.params);
                return;
            case DispatchSource.QUERY:
                data = Object.assign(Object.assign({}, data), context.request.query);
        }
    });
    const query = data;
    if (!query)
        throw Exception.api()
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
    yield compose(success, sendJson(result))(context);
});
export const DispatchQueryFromBody = (handler) => DispatchQuery(handler, DispatchSource.BODY);
export const DispatchQueryFromQuery = (handler) => DispatchQuery(handler, DispatchSource.QUERY);
export const DispatchQueryFromParams = (handler) => DispatchQuery(handler, DispatchSource.PARAMS);
export const DispatchQueryFormValue = (value, handler) => (context) => __awaiter(void 0, void 0, void 0, function* () {
    if (!value)
        throw Exception.api()
            .withMessage('Value for query dispatch is invalid (null or undefined)')
            .from('DispatchQueryFromValue')
            .withMeta({ value: value });
    const result = yield handler(value);
    yield compose(success, sendJson(result))(context);
});
