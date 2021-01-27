"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const fs = __importStar(require("fs"));
const exception_1 = require("src/exception");
class AppConfig {
    constructor() {
        this.envVariablesCache = [];
        this.configObjectCache = [];
        if (AppConfig.instance) {
            return AppConfig.instance;
        }
        this.initConfiguration();
        AppConfig.instance = this;
    }
    static getInstance() {
        if (!this.instance) {
            return new this();
        }
        return this.instance;
    }
    initConfiguration() {
        var _a;
        // by default we consider that we store configuration in
        // config.<envType>.json in root directory of the server
        const rootDir = process.cwd();
        const env = (_a = process.env.ENV) !== null && _a !== void 0 ? _a : 'dev';
        this.envVariablesCache.push({
            key: 'ENV',
            value: env,
        });
        const configFilePath = `${rootDir}/config.${env}.json`;
        if (!fs.existsSync(configFilePath)) {
            throw exception_1.Exception.internal()
                .withMessage('Cannot run application due to lack of config file')
                .from(this.constructor.name);
        }
        this.configFile = require(configFilePath);
    }
    bind(sectionName, config) {
        // try to get config object from cache
        const cached = this.configObjectCache.find((x) => x.key === sectionName);
        if (cached) {
            Object.assign(config, cached.value);
            return;
        }
        // try to get object from config file & cache it then
        try {
            Object.assign(config, this.configFile[sectionName]);
        }
        catch (exception) {
            throw exception_1.Exception.internal()
                .withMessage(`Failed to assign section ${sectionName}`)
                .withMeta(exception)
                .from(this.constructor.name);
        }
        this.configObjectCache.push({
            key: sectionName,
            value: config,
        });
    }
    getEnvironmentVariable(variable) {
        // try to get env variable from cache
        const value = this.envVariablesCache.find((x) => x.key === variable);
        if (value) {
            return value.value;
        }
        // try to get env variable directly & save to cache if it exists
        const envValue = process.env[variable];
        if (envValue) {
            this.envVariablesCache.push({
                key: variable,
                value: envValue,
            });
        }
        return envValue;
    }
}
exports.AppConfig = AppConfig;
