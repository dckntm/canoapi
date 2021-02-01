var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StatusCode } from 'core';
import { Exception } from 'exception';
import { injectLogService } from 'log';
import { MongoClient } from 'mongodb';
import { injectMongoConfig } from './injections';
export class MongoDatabase {
    constructor() {
        this.config = injectMongoConfig();
    }
    get Database() {
        return MongoDatabase.client.db(this.config.database);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const log = injectLogService();
            if (!this.isConnected()) {
                log.info('Connecting...');
                if (this.config.connectionString) {
                    MongoDatabase.client = yield MongoClient.connect(this.config.connectionString, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    });
                }
                else
                    throw Exception.internal()
                        .withMessage('Failed to connect to mongodb due to lack of connection string')
                        .from('MongoDatabase')
                        .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR);
            }
            log.info(`Connected to ${this.config.connectionString}`);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected()) {
                yield MongoDatabase.client.close();
            }
        });
    }
    isConnected() {
        return Boolean(MongoDatabase.client);
    }
}
