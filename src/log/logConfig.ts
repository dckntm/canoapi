import { LogLevel } from './logLevel';

export interface ILogConfig {
  console: LogLevel[];
}

export const DefaultLogConfig: ILogConfig = {
  console: [
    LogLevel.ERROR,
    LogLevel.INFO,
    LogLevel.DEBUG,
    LogLevel.FATAL,
    LogLevel.WARN,
  ],
};
