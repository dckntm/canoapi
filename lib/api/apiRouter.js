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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
var core_1 = require("core");
var express_1 = require("express");
var log_1 = require("log");
var handlers_1 = require("./handlers");
var httpContext_1 = require("./httpContext");
var ApiRouter = /** @class */ (function () {
    function ApiRouter(base, defaultHandlers, routes) {
        if (defaultHandlers === void 0) { defaultHandlers = []; }
        if (routes === void 0) { routes = []; }
        this.base = base;
        this.defaultHandlers = defaultHandlers;
        this.routes = routes;
    }
    ApiRouter.prototype.apply = function () {
        var e_1, _a;
        var _this = this;
        var log = log_1.LogService.getInstance();
        var router = express_1.Router();
        log.info("Applying router: " + this.constructor.name);
        var _loop_1 = function (route) {
            var path = "" + this_1.base + route.path;
            var handler = function (request, response) { return __awaiter(_this, void 0, void 0, function () {
                var context, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            log.info("Calling " + route.method + " " + path);
                            context = new httpContext_1.HttpContext(request, response, {});
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 5]);
                            return [4 /*yield*/, handlers_1.compose.apply(void 0, __spread(this.defaultHandlers, [route.handler, handlers_1.end]))(context)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            e_2 = _a.sent();
                            return [4 /*yield*/, handlers_1.handleException(e_2)(context)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
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
            log.info("Add route: " + route.method + " " + path);
        };
        var this_1 = this;
        try {
            for (var _b = __values(this.routes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var route = _c.value;
                _loop_1(route);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return router;
    };
    ApiRouter.prototype.get = function (path, handler) {
        this.routes.push({
            path: path,
            method: core_1.HttpMethod.GET,
            handler: handler,
        });
        return this;
    };
    ApiRouter.prototype.post = function (path, handler) {
        this.routes.push({
            path: path,
            method: core_1.HttpMethod.POST,
            handler: handler,
        });
        return this;
    };
    ApiRouter.prototype.put = function (path, handler) {
        this.routes.push({
            path: path,
            method: core_1.HttpMethod.PUT,
            handler: handler,
        });
        return this;
    };
    ApiRouter.prototype.delete = function (path, handler) {
        this.routes.push({
            path: path,
            method: core_1.HttpMethod.DELETE,
            handler: handler,
        });
        return this;
    };
    return ApiRouter;
}());
exports.ApiRouter = ApiRouter;
