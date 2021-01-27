"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = void 0;
const exception_1 = require("src/exception");
const Validate = (schema) => (context) => __awaiter(void 0, void 0, void 0, function* () {
    const body = context.request.body;
    try {
        yield schema.validate(body);
    }
    catch (e) {
        throw exception_1.Exception.api()
            .withMessage('Validation failed')
            .from('Validate')
            .withMeta({ object: body, error: e });
    }
});
exports.Validate = Validate;
