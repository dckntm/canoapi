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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDatabase = void 0;
var core_1 = require("core");
var exception_1 = require("exception");
var log_1 = require("log");
var mongodb_1 = require("mongodb");
var injections_1 = require("./injections");
var MongoDatabase = /** @class */ (function () {
    function MongoDatabase() {
        this.config = injections_1.injectMongoConfig();
    }
    Object.defineProperty(MongoDatabase.prototype, "Database", {
        get: function () {
            return MongoDatabase.client.db(this.config.database);
        },
        enumerable: false,
        configurable: true
    });
    MongoDatabase.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log = log_1.injectLogService();
                        if (!!this.isConnected()) return [3 /*break*/, 3];
                        log.info('Connecting...');
                        if (!this.config.connectionString) return [3 /*break*/, 2];
                        _a = MongoDatabase;
                        return [4 /*yield*/, mongodb_1.MongoClient.connect(this.config.connectionString, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                            })];
                    case 1:
                        _a.client = _b.sent();
                        return [3 /*break*/, 3];
                    case 2: throw exception_1.Exception.internal()
                        .withMessage('Failed to connect to mongodb due to lack of connection string')
                        .from('MongoDatabase')
                        .withStatusCode(core_1.StatusCode.INTERNAL_SERVER_ERROR);
                    case 3:
                        log.info("Connected to " + this.config.connectionString);
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDatabase.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isConnected()) return [3 /*break*/, 2];
                        return [4 /*yield*/, MongoDatabase.client.close()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MongoDatabase.prototype.isConnected = function () {
        return Boolean(MongoDatabase.client);
    };
    return MongoDatabase;
}());
exports.MongoDatabase = MongoDatabase;
