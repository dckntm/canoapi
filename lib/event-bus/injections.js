"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectEventBus = void 0;
var eventBus_1 = require("./eventBus");
var injectEventBus = function () { return new eventBus_1.EventBus(); };
exports.injectEventBus = injectEventBus;
