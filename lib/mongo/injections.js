var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { injectAppConfig } from 'config';
import { MongoDatabase } from './mongoDatabase';
import { MongoRepository } from './mongoRepository';
export const injectMongoConfig = () => {
    const appConfig = injectAppConfig();
    const config = {};
    appConfig.bind('mongo', config);
    return config;
};
export const connectToMongoDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoDatabase = new MongoDatabase();
    yield mongoDatabase.connect();
});
export const injectMongoDatabase = () => {
    return new MongoDatabase();
};
export const injectMongoRepository = (collection) => {
    return new MongoRepository(collection);
};
