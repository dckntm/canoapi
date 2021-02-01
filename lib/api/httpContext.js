"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpContext = void 0;
// this is default example HttpContext
// I recommend overriding via extending
// your domain-specific HttpContext
var HttpContext = /** @class */ (function () {
    function HttpContext(request, response, meta) {
        this.request = request;
        this.response = response;
        this.finished = false;
        this.payload = null;
        this.meta = meta;
    }
    HttpContext.prototype.getPayload = function () {
        return this.payload;
    };
    HttpContext.prototype.setPayload = function (value) {
        if (this.payload)
            return;
        this.payload = value;
    };
    return HttpContext;
}());
exports.HttpContext = HttpContext;
