import { compose, HttpHandler, IHttpContext, sendJson, setStatus } from 'api';
import { StatusCode } from 'core';
import { Exception } from 'exception';
import { injectLogService } from 'log';

export const handleException: (e: any) => HttpHandler = (e: any) => async (
  context: IHttpContext,
) => {
  const log = injectLogService();
  let exception: Exception;

  if (!(e instanceof Exception)) {
    exception = Exception.internal()
      .withMessage('Unhandled internal exception')
      .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
      .withMeta(e);
  } else {
    exception = e;
  }

  log.error(exception);

  await compose(setStatus(exception.status), sendJson(exception))(context);
};
