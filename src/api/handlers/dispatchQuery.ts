import {
  compose,
  DispatchSource,
  HttpHandler,
  IHttpContext,
  sendJson,
  success,
} from 'src/api';
import { Exception } from 'src/exception';

export const DispatchQuery: <TQuery, TResult>(
  handler: (query: TQuery) => Promise<TResult> | TResult,
  ...source: DispatchSource[]
) => HttpHandler = <TQuery, TResult>(
  handler: (query: TQuery) => Promise<TResult> | TResult,
  ...source: DispatchSource[]
) => async (context: IHttpContext) => {
  let data: any = {};

  source.forEach((x) => {
    switch (x) {
      case DispatchSource.BODY:
        data = { ...data, ...context.request.body };
        return;
      case DispatchSource.PARAMS:
        data = { ...data, ...context.request.params };
        return;
      case DispatchSource.QUERY:
        data = { ...data, ...context.request.query };
    }
  });

  const query = data as TQuery;

  if (!query)
    throw Exception.api()
      .withMessage('Failed to read query')
      .from('DispatchQuery')
      .withMeta({
        body: context.request.body,
        params: context.request.params,
        query: context.request.query,
        data: data,
      });

  // may throw error which will be handled on the top-most level
  const result = await handler(query);

  await compose(success, sendJson(result))(context);
};

export const DispatchQueryFromBody: <TQuery, TResult>(
  handler: (query: TQuery) => Promise<TResult> | TResult,
) => HttpHandler = <TQuery, TResult>(
  handler: (query: TQuery) => Promise<TResult> | TResult,
) => DispatchQuery(handler, DispatchSource.BODY);

export const DispatchQueryFromQuery: <TQuery, TResult>(
  handler: (query: TQuery) => Promise<TResult> | TResult,
) => HttpHandler = <TQuery, TResult>(
  handler: (query: TQuery) => Promise<TResult> | TResult,
) => DispatchQuery(handler, DispatchSource.QUERY);

export const DispatchQueryFromParams: <TQuery, TResult>(
  handler: (query: TQuery) => Promise<TResult> | TResult,
) => HttpHandler = <TQuery, TResult>(
  handler: (query: TQuery) => Promise<TResult> | TResult,
) => DispatchQuery(handler, DispatchSource.PARAMS);

export const DispatchQueryFormValue: <TQuery, TResult>(
  value: TQuery,
  handler: (query: TQuery) => Promise<TResult> | TResult,
) => HttpHandler = <TQuery, TResult>(
  value: TQuery,
  handler: (query: TQuery) => Promise<TResult> | TResult,
) => async (context: IHttpContext) => {
  if (!value)
    throw Exception.api()
      .withMessage('Value for query dispatch is invalid (null or undefined)')
      .from('DispatchQueryFromValue')
      .withMeta({ value: value });

  const result = await handler(value);

  await compose(success, sendJson(result))(context);
};
