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
exports.ApiRouter = void 0;
const core_1 = require("core");
const express_1 = require("express");
const log_1 = require("log");
const handlers_1 = require("./handlers");
const httpContext_1 = require("./httpContext");
class ApiRouter {
    constructor(base, defaultHandlers = [], routes = []) {
        this.base = base;
        this.defaultHandlers = defaultHandlers;
        this.routes = routes;
    }
    apply() {
        const log = log_1.LogService.getInstance();
        const router = express_1.Router();
        log.info(`Applying router: ${this.constructor.name}`);
        for (const route of this.routes) {
            const path = `${this.base}${route.path}`;
            const handler = (request, response) => __awaiter(this, void 0, void 0, function* () {
                log.info(`Calling ${route.method} ${path}`);
                const context = new httpContext_1.HttpContext(request, response, {});
                try {
                    yield handlers_1.compose(...this.defaultHandlers, route.handler, handlers_1.end)(context);
                }
                catch (e) {
                    yield handlers_1.handleException(e)(context);
                }
            });
            switch (route.method) {
                case core_1.HttpMethod.GET:
                    router.get(path, handler);
                case core_1.HttpMethod.POST:
                    router.post(path, handler);
                case core_1.HttpMethod.PUT:
                    router.put(path, handler);
                case core_1.HttpMethod.DELETE:
                    router.delete(path, handler);
            }
            log.info(`Add route: ${route.method} ${path}`);
        }
        return router;
    }
    get(path, handler) {
        this.routes.push({
            path: path,
            method: core_1.HttpMethod.GET,
            handler: handler,
        });
        return this;
    }
    post(path, handler) {
        this.routes.push({
            path: path,
            method: core_1.HttpMethod.POST,
            handler: handler,
        });
        return this;
    }
    put(path, handler) {
        this.routes.push({
            path: path,
            method: core_1.HttpMethod.PUT,
            handler: handler,
        });
        return this;
    }
    delete(path, handler) {
        this.routes.push({
            path: path,
            method: core_1.HttpMethod.DELETE,
            handler: handler,
        });
        return this;
    }
}
exports.ApiRouter = ApiRouter;
