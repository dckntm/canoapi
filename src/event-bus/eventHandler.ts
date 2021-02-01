import { IEvent } from '../core';

export type EventHandler<TEvent extends IEvent<any, any>> = (
  event: TEvent,
) => void | Promise<void>;
