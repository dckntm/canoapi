import { IEvent } from 'src/core';
import { EventHandler } from './eventHandler';
export declare type Event = IEvent<any, any>;
export declare class EventBus {
    private handlers;
    private static instance;
    constructor();
    subscribe(handle: EventHandler<Event>): this;
    unsubscribe(handle: EventHandler<Event>): this;
    dispatch(event: Event): Promise<void>;
}
