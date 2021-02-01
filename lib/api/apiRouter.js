var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpMethod } from 'core';
import { Router } from 'express';
import { LogService } from 'log';
import { compose, end, handleException } from './handlers';
import { HttpContext } from './httpContext';
export class ApiRouter {
    constructor(base, defaultHandlers = [], routes = []) {
        this.base = base;
        this.defaultHandlers = defaultHandlers;
        this.routes = routes;
    }
    apply() {
        const log = LogService.getInstance();
        const router = Router();
        log.info(`Applying router: ${this.constructor.name}`);
        for (const route of this.routes) {
            const path = `${this.base}${route.path}`;
            const handler = (request, response) => __awaiter(this, void 0, void 0, function* () {
                log.info(`Calling ${route.method} ${path}`);
                const context = new HttpContext(request, response, {});
                try {
                    yield compose(...this.defaultHandlers, route.handler, end)(context);
                }
                catch (e) {
                    yield handleException(e)(context);
                }
            });
            switch (route.method) {
                case HttpMethod.GET:
                    router.get(path, handler);
                case HttpMethod.POST:
                    router.post(path, handler);
                case HttpMethod.PUT:
                    router.put(path, handler);
                case HttpMethod.DELETE:
                    router.delete(path, handler);
            }
            log.info(`Add route: ${route.method} ${path}`);
        }
        return router;
    }
    get(path, handler) {
        this.routes.push({
            path: path,
            method: HttpMethod.GET,
            handler: handler,
        });
        return this;
    }
    post(path, handler) {
        this.routes.push({
            path: path,
            method: HttpMethod.POST,
            handler: handler,
        });
        return this;
    }
    put(path, handler) {
        this.routes.push({
            path: path,
            method: HttpMethod.PUT,
            handler: handler,
        });
        return this;
    }
    delete(path, handler) {
        this.routes.push({
            path: path,
            method: HttpMethod.DELETE,
            handler: handler,
        });
        return this;
    }
}
