export declare class AppConfig {
    private static instance;
    private envVariablesCache;
    private configObjectCache;
    private configFile;
    constructor();
    static getInstance(): AppConfig;
    private initConfiguration;
    bind<T>(sectionName: string, config: T): void;
    getEnvironmentVariable(variable: string): string | undefined;
}
