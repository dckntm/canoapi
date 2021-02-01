import { LogService } from './logService';

export const injectLogService = (): LogService => LogService.getInstance();
