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
exports.injectMongoRepository = exports.injectMongoDatabase = exports.connectToMongoDatabase = exports.injectMongoConfig = void 0;
const index_1 = require("index");
const mongoDatabase_1 = require("./mongoDatabase");
const mongoRepository_1 = require("./mongoRepository");
const injectMongoConfig = () => {
    const appConfig = index_1.injectAppConfig();
    const config = {};
    appConfig.bind('mongo', config);
    return config;
};
exports.injectMongoConfig = injectMongoConfig;
const connectToMongoDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoDatabase = new mongoDatabase_1.MongoDatabase();
    yield mongoDatabase.connect();
});
exports.connectToMongoDatabase = connectToMongoDatabase;
const injectMongoDatabase = () => {
    return new mongoDatabase_1.MongoDatabase();
};
exports.injectMongoDatabase = injectMongoDatabase;
const injectMongoRepository = (collection) => {
    return new mongoRepository_1.MongoRepository(collection);
};
exports.injectMongoRepository = injectMongoRepository;
