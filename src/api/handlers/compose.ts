import { HttpHandler, IHttpContext } from 'src/api';

export const compose: (...handlers: HttpHandler[]) => HttpHandler = (
  ...handlers: HttpHandler[]
) => async (context: IHttpContext) => {
  for (const handler of handlers) await handler(context);
};
