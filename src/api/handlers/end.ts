import { IHttpContext } from 'api';
import { injectLogService } from 'log';

export const end = (context: IHttpContext): void => {
  const log = injectLogService();

  context.response.end(() =>
    log.info(`Request ${context.request.method} ${context.request.url} ended`),
  );
};
