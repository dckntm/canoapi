"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var axios_1 = __importDefault(require("axios"));
var core_1 = require("../core");
var exception_1 = require("../exception");
var log_1 = require("../log");
var HttpClient = /** @class */ (function () {
    function HttpClient() {
        this.config = {};
    }
    HttpClient.prototype.request = function (url, method, data, headers) {
        if (data === void 0) { data = {}; }
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var log, response, e_1, exception;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log = log_1.injectLogService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        log.debug('Calling request', "" + this.config.base + url, method, data, headers);
                        return [4 /*yield*/, axios_1.default.request({
                                url: "" + this.config.base + url,
                                method: method,
                                data: data,
                                headers: __assign(__assign({}, this.config.defaultHeaders), headers),
                            })];
                    case 2:
                        response = _a.sent();
                        log.debug('Response:', response);
                        if (response.status !== core_1.StatusCode.SUCCESS)
                            throw exception_1.Exception.internal()
                                .withMessage("Failed to make HTTP call " + this.config.base + url)
                                .withStatusCode(core_1.StatusCode.INTERNAL_SERVER_ERROR)
                                .from('HttpClient')
                                .withMeta(response);
                        return [2 /*return*/, response.data];
                    case 3:
                        e_1 = _a.sent();
                        exception = void 0;
                        if (!(e_1 instanceof exception_1.Exception))
                            exception = exception_1.Exception.internal()
                                .withMessage("Failed to make HTTP call " + this.config.base + url)
                                .withStatusCode(core_1.StatusCode.INTERNAL_SERVER_ERROR)
                                .from('HttpClient')
                                .withMeta(e_1);
                        else
                            exception = e_1;
                        throw exception;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpClient.prototype.get = function (url, data, headers) {
        if (data === void 0) { data = {}; }
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(url, core_1.HttpMethod.GET, data, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpClient.prototype.post = function (url, data, headers) {
        if (data === void 0) { data = {}; }
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(url, core_1.HttpMethod.POST, data, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpClient.prototype.put = function (url, data, headers) {
        if (data === void 0) { data = {}; }
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(url, core_1.HttpMethod.PUT, data, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpClient.prototype.delete = function (url, data, headers) {
        if (data === void 0) { data = {}; }
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(url, core_1.HttpMethod.DELETE, data, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
