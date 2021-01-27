import { LogLevel } from './logLevel';

// config intends to provide info about log levels
// we want to log to different sources
// as we currently have only console logging via tslog
// we are going to

// default config for console log
export interface ILogConfig {
  // we log by default everything
  console?: LogLevel[];
}
