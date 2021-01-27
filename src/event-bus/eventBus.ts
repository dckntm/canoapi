import { IEvent } from 'src/core';
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
    for (const handle of this.handlers.values()) {
      await handle(event);
    }
  }
}
