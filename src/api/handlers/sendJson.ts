import { HttpHandler, IHttpContext } from 'src/api';
import { Exception } from 'src/exception';

export const sendJson: <T>(body: T) => HttpHandler = <T>(body: T) => (
  context: IHttpContext,
) => {
  if (context.finished)
    throw Exception.api()
      .withMessage('Cannot send json as request is already finished')
      .from('SendJson');

  context.response.json(body);
  context.finished = true;
};
