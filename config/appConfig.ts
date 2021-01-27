import * as fs from 'fs';
import { Exception } from 'exception';

interface IEnvironmentVariableCache {
  key: string;
  value: string;
}

interface IConfigurationObjectCache {
  key: string;
  value: any;
}

export class AppConfig {
  private static instance: AppConfig;
  private envVariablesCache: IEnvironmentVariableCache[] = [];
  private configObjectCache: IConfigurationObjectCache[] = [];
  private configFile: any;

  public constructor() {
    if (AppConfig.instance) {
      return AppConfig.instance;
    }

    this.initConfiguration();

    AppConfig.instance = this;
  }

  public static getInstance(): AppConfig {
    if (!this.instance) {
      return new this();
    }

    return this.instance;
  }

  private initConfiguration(): void {
    // by default we consider that we store configuration in
    // config.<envType>.json in root directory of the server
    const rootDir = process.cwd();
    const env = process.env.ENV ?? 'dev';

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

  public bind<T>(sectionName: string, config: T): void {
    // try to get config object from cache
    const cached = this.configObjectCache.find((x) => x.key === sectionName);

    if (cached) {
      Object.assign(config, cached.value);
      return;
    }

    // try to get object from config file & cache it then
    try {
      Object.assign(config, this.configFile[sectionName]);
    } catch (exception) {
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

  public getEnvironmentVariable(variable: string): string | undefined {
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
