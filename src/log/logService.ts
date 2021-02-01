import { Logger } from 'tslog';
import { injectAppConfig } from '../config';
import { ILogConfig } from './logConfig';
import { LogLevel } from './logLevel';

// TODO: think over scoping log service and services generally
// singletons are not always good approach

export class LogService {
  private config: ILogConfig = {};
  private tslog!: Logger;
  private static instance: LogService;

  // TODO : think of how to make it really abstract and
  // support mail notification and event bus log pushes
  constructor() {
    if (!LogService.instance) {
      injectAppConfig().bind('log', this.config);

      this.tslog = new Logger({
        displayFunctionName: false,
        displayFilePath: 'hidden',
        dateTimePattern: 'year-month-day hour:minute:second',
      });
    }

    LogService.instance = this;
  }

  public static getInstance(): LogService {
    if (!this.instance) {
      return new this();
    }

    return this.instance;
  }

  public log(level: LogLevel, ...data: any[]): void {
    switch (level) {
      case LogLevel.DEBUG:
        this.debug(...data);
        return;
      case LogLevel.ERROR:
        this.error(...data);
        return;
      case LogLevel.FATAL:
        this.fatal(...data);
        return;
      case LogLevel.INFO:
        this.info(...data);
        return;
      case LogLevel.TRACE:
        this.trace(...data);
        return;
      case LogLevel.WARN:
        this.warning(...data);
        return;
    }
  }

  public trace(...data: any[]): void {
    if (this.config.console?.includes(LogLevel.TRACE))
      this.tslog.trace(...data);
  }

  public info(...data: any[]): void {
    if (this.config.console?.includes(LogLevel.INFO)) this.tslog.info(...data);
  }

  public warning(...data: any[]): void {
    if (this.config.console?.includes(LogLevel.WARN)) this.tslog.warn(...data);
  }

  public debug(...data: any[]): void {
    if (this.config.console?.includes(LogLevel.DEBUG))
      this.tslog.debug(...data);
  }

  public error(...data: any[]): void {
    if (this.config.console?.includes(LogLevel.ERROR))
      this.tslog.error(...data);
  }

  public fatal(...data: any[]): void {
    if (this.config.console?.includes(LogLevel.FATAL))
      this.tslog.fatal(...data);
  }
}
