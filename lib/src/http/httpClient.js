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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const core_1 = require("core");
const index_1 = require("./node_modules/index");
const log_1 = require("log");
class HttpClient {
    constructor() {
        this.config = {};
    }
    request(url, method, data = {}, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const log = log_1.injectLogService();
            try {
                log.debug('Calling request', `${this.config.base}${url}`, method, data, headers);
                const response = yield axios_1.default.request({
                    url: `${this.config.base}${url}`,
                    method: method,
                    data: data,
                    headers: Object.assign(Object.assign({}, this.config.defaultHeaders), headers),
                });
                log.debug('Response:', response);
                if (response.status !== core_1.StatusCode.SUCCESS)
                    throw index_1.Exception.internal()
                        .withMessage(`Failed to make HTTP call ${this.config.base}${url}`)
                        .withStatusCode(core_1.StatusCode.INTERNAL_SERVER_ERROR)
                        .from('HttpClient')
                        .withMeta(response);
                return response.data;
            }
            catch (e) {
                let exception;
                if (!(e instanceof index_1.Exception))
                    exception = index_1.Exception.internal()
                        .withMessage(`Failed to make HTTP call ${this.config.base}${url}`)
                        .withStatusCode(core_1.StatusCode.INTERNAL_SERVER_ERROR)
                        .from('HttpClient')
                        .withMeta(e);
                else
                    exception = e;
                throw exception;
            }
        });
    }
    get(url, data = {}, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(url, core_1.HttpMethod.GET, data, headers);
        });
    }
    post(url, data = {}, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(url, core_1.HttpMethod.POST, data, headers);
        });
    }
    put(url, data = {}, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(url, core_1.HttpMethod.PUT, data, headers);
        });
    }
    delete(url, data = {}, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(url, core_1.HttpMethod.DELETE, data, headers);
        });
    }
}
exports.HttpClient = HttpClient;
