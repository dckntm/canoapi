"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectEventBus = void 0;
const eventBus_1 = require("./eventBus");
const injectEventBus = () => new eventBus_1.EventBus();
exports.injectEventBus = injectEventBus;
