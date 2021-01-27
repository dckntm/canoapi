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
exports.MongoRepository = void 0;
const core_1 = require("src/core");
const exception_1 = require("src/exception");
const _1 = require(".");
const flattenObject_1 = require("./utils/flattenObject");
// TODO: implement from IRepository
class MongoRepository {
    constructor(collection) {
        this.collection = collection;
        this.mongoDatabase = _1.injectMongoDatabase();
    }
    create(entity, externalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection();
            const defaultValues = yield this.collection.getDefault();
            const id = externalId !== null && externalId !== void 0 ? externalId : (yield this.collection.getNextId(collection));
            // TODO : some id handling needed
            const data = Object.assign(Object.assign({ _id: id }, defaultValues), entity);
            const operation = yield collection.insertOne(data);
            if (!operation.result.ok)
                throw exception_1.Exception.internal()
                    .withMessage('Failed to create entity')
                    .withStatusCode(core_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .withMeta({ data })
                    .from('MongoRepository');
            return id;
        });
    }
    getOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection();
            const document = yield collection.findOne(filter);
            if (document) {
                return document;
            }
            throw exception_1.Exception.internal()
                .withMessage('Failed to get entity')
                .withStatusCode(core_1.StatusCode.INTERNAL_SERVER_ERROR)
                .withMeta({ filter })
                .from('MongoRepository');
        });
    }
    // TODO: add querying
    getMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection();
            const query = yield collection.find(filter);
            const documents = yield query.toArray();
            return documents;
        });
    }
    updateOne(query, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection();
            const flatUpdates = flattenObject_1.flattenObject(updates, { shouldReplaceArrays: true });
            const operation = yield collection.updateOne(query, {
                $set: Object.assign({}, flatUpdates),
            });
            return operation.result.ok === 1;
        });
    }
    getEntityCount(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection();
            return yield collection.countDocuments(query);
        });
    }
    deleteOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection();
            const operation = yield collection.deleteOne(query);
            return operation.result.ok === 1;
        });
    }
    getCollection() {
        const db = this.mongoDatabase.Database;
        return db.collection(this.collection.name);
    }
    GetNextId() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getCollection().countDocuments({})) + 1;
        });
    }
}
exports.MongoRepository = MongoRepository;
