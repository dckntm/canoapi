"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpContext = void 0;
// this is default example HttpContext
// I recommend overriding via extending
// your domain-specific HttpContext
class HttpContext {
    constructor(request, response, meta) {
        this.request = request;
        this.response = response;
        this.finished = false;
        this.payload = null;
        this.meta = meta;
    }
    getPayload() {
        return this.payload;
    }
    setPayload(value) {
        if (this.payload)
            return;
        this.payload = value;
    }
}
exports.HttpContext = HttpContext;
