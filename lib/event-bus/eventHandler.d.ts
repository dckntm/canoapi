import { IEvent } from '../core';
export declare type EventHandler<TEvent extends IEvent<any, any>> = (event: TEvent) => void | Promise<void>;
