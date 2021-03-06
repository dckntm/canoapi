import { injectLogService } from '../log';
import { Db, MongoClient } from 'mongodb';
import { DefaultMongoConfig, injectAppConfig } from '..';

export class MongoConnection {
  private static database: string;
  private static client: MongoClient;

  private constructor() {}

  public static getDatabase(): Db {
    return MongoConnection.client.db(MongoConnection.database);
  }

  public static async init(): Promise<void> {
    if (!this.client) {
      const log = injectLogService();
      const appConfig = injectAppConfig();
      const config = { ...DefaultMongoConfig };

      appConfig.bind('mongo', config);

      this.database = config.database;

      log.info('Connecting to Mongo...');

      MongoConnection.client = await MongoClient.connect(
        config.connectionString,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      );

      log.info(`Connected to MongoDB on ${config.connectionString}`);
    }
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected()) {
      await MongoConnection.client.close();
    }
  }

  public isConnected(): boolean {
    return Boolean(MongoConnection.client);
  }
}
