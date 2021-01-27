import { StatusCode } from 'core';
import { Exception } from 'exception';
import { injectLogService } from 'log';
import { Db, MongoClient } from 'mongodb';
import { injectMongoConfig } from './injections';
import { IMongoConfig } from './mongoConfig';

export class MongoDatabase {
  private readonly config: IMongoConfig;
  private static client: MongoClient;

  public constructor() {
    this.config = injectMongoConfig();
  }

  public get Database(): Db {
    return MongoDatabase.client.db(this.config.database);
  }

  public async connect(): Promise<void> {
    const log = injectLogService();

    if (!this.isConnected()) {
      log.info('Connecting...');

      if (this.config.connectionString) {
        MongoDatabase.client = await MongoClient.connect(
          this.config.connectionString,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          },
        );
      } else
        throw Exception.internal()
          .withMessage(
            'Failed to connect to mongodb due to lack of connection string',
          )
          .from('MongoDatabase')
          .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR);
    }

    log.info(`Connected to ${this.config.connectionString}`);
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected()) {
      await MongoDatabase.client.close();
    }
  }

  public isConnected(): boolean {
    return Boolean(MongoDatabase.client);
  }
}
