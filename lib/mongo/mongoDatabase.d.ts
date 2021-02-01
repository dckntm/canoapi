import { Db } from 'mongodb';
export declare class MongoDatabase {
    private readonly config;
    private static client;
    constructor();
    get Database(): Db;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): boolean;
}
