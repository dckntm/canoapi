import { IEvent } from '../core';
import { EventHandler } from './eventHandler';

export type Event = IEvent<any, any>;

export class EventBus {
  private handlers!: Set<EventHandler<Event>>;
  private static instance: EventBus;

  public constructor() {
    if (!EventBus.instance) {
      this.handlers = new Set();
      EventBus.instance = this;
      return;
    }

    return EventBus.instance;
  }

  public subscribe(handle: EventHandler<Event>): this {
    this.handlers.add(handle);

    return this;
  }

  public unsubscribe(handle: EventHandler<Event>): this {
    this.handlers.delete(handle);

    return this;
  }

  public async dispatch(event: Event): Promise<void> {
    this.handlers.forEach(async (x) => await x(event));
  }
}
