import { injectAppConfig } from '../config';
import { DefaultLogConfig, ILogConfig } from './logConfig';
import { LogService } from './logService';

export const injectLogService = (): LogService => LogService.getInstance();

export const injectLogConfig = (): ILogConfig => {
  const config = injectAppConfig();
  const logConfig = DefaultLogConfig;

  config.bind('log', logConfig);

  return logConfig;
};
