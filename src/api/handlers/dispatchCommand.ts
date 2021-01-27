import { DispatchSource, HttpHandler, IHttpContext } from 'src/api';
import { Exception } from 'src/exception';

export const dispatchCommand: <TCommand>(
  handler: (query: TCommand) => Promise<void> | void,
  ...source: DispatchSource[]
) => HttpHandler = <TCommand>(
  handler: (query: TCommand) => Promise<void> | void,
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

  const command = data as TCommand;

  if (!command)
    throw Exception.api()
      .withMessage('Failed to read command')
      .from('DispatchCommand')
      .withMeta({
        body: context.request.body,
        params: context.request.params,
        query: context.request.query,
        data: data,
      });

  // may throw error which will be handled on the top-most level
  await handler(command);
};

export const dispatchCommandFromBody: <TCommand>(
  handler: (command: TCommand) => Promise<void> | void,
) => HttpHandler = <TCommand>(
  handler: (command: TCommand) => Promise<void> | void,
) => dispatchCommand(handler, DispatchSource.BODY);

export const dispatchCommandFromQuery: <TCommand>(
  handler: (command: TCommand) => Promise<void> | void,
) => HttpHandler = <TCommand>(
  handler: (command: TCommand) => Promise<void> | void,
) => dispatchCommand(handler, DispatchSource.QUERY);

export const dispatchCommandFromParams: <TCommand>(
  handler: (command: TCommand) => Promise<void> | void,
) => HttpHandler = <TCommand>(
  handler: (command: TCommand) => Promise<void> | void,
) => dispatchCommand(handler, DispatchSource.PARAMS);

export const dispatchCommandFormValue: <TCommand>(
  value: TCommand,
  handler: (command: TCommand) => Promise<void> | void,
) => HttpHandler = <TCommand>(
  value: TCommand,
  handler: (command: TCommand) => Promise<void> | void,
) => async (context: IHttpContext) => {
  if (!value)
    throw Exception.api()
      .withMessage('Value for query dispatch is invalid (null or undefined)')
      .from('DispatchQueryFromValue')
      .withMeta({ value: value });

  await handler(value);
};
