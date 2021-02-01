var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class EventBus {
    constructor() {
        if (!EventBus.instance) {
            this.handlers = new Set();
            EventBus.instance = this;
            return;
        }
        return EventBus.instance;
    }
    subscribe(handle) {
        this.handlers.add(handle);
        return this;
    }
    unsubscribe(handle) {
        this.handlers.delete(handle);
        return this;
    }
    dispatch(event) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const handle of this.handlers.values()) {
                yield handle(event);
            }
        });
    }
}
