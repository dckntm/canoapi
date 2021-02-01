import * as fs from 'fs';
import { Exception } from 'exception';
export class AppConfig {
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
            throw Exception.internal()
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
            throw Exception.internal()
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
