import { IHttpContext } from 'src/api';
import { injectLogService } from 'src/log';

export const end = (context: IHttpContext): void => {
  const log = injectLogService();

  context.response.end(() =>
    log.info(`Request ${context.request.method} ${context.request.url} ended`),
  );
};
