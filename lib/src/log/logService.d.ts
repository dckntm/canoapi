import { LogLevel } from './logLevel';
export declare class LogService {
    private config;
    private tslog;
    private static instance;
    constructor();
    static getInstance(): LogService;
    log(level: LogLevel, ...data: any[]): void;
    trace(...data: any[]): void;
    info(...data: any[]): void;
    warning(...data: any[]): void;
    debug(...data: any[]): void;
    error(...data: any[]): void;
    fatal(...data: any[]): void;
}
