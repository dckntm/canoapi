import { HttpHandler, IHttpContext } from '../';
import { Exception } from '../../exception';

export const sendJson: <T>(body: T) => HttpHandler = <T>(body: T) => (
  context: IHttpContext,
) => {
  if (context.finished)
    throw Exception.api()
      .withMessage('Cannot send json as request is already finished')
      .from('sendJson');

  context.response.json(body);
  context.finished = true;
};
