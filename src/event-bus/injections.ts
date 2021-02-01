import { EventBus } from './eventBus';

export const injectEventBus = (): EventBus => new EventBus();
