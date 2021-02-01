"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenObject = void 0;
function flattenObject(obj, options) {
    var e_1, _a;
    if (options === void 0) { options = {}; }
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    var flatObject = {};
    try {
        for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var propName = _c.value;
            var value = obj[propName];
            if (typeof value === 'object') {
                flattenNestedProperty(propName, value, flatObject, options);
            }
            else {
                flatObject[propName] = value;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return flatObject;
}
exports.flattenObject = flattenObject;
function flattenNestedProperty(parentPropertyName, source, result, options) {
    var e_2, _a;
    var flattenValue = function (value, propName, result) {
        if (value && typeof value === 'object') {
            flattenNestedProperty(propName, value, result, options);
        }
        else {
            result[propName] = value;
        }
    };
    if (Array.isArray(source)) {
        if (options.shouldReplaceArrays) {
            result[parentPropertyName] = source;
        }
        else {
            for (var i = 0; i < source.length; i++) {
                var flatPropertyName = parentPropertyName + "." + i;
                flattenValue(source[i], flatPropertyName, result);
            }
        }
    }
    else {
        try {
            for (var _b = __values(Object.keys(source)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propName = _c.value;
                var value = source[propName];
                var flatPropertyName = parentPropertyName + "." + propName;
                flattenValue(value, flatPropertyName, result);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
}
