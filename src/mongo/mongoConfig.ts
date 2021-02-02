export interface IMongoConfig {
  connectionString: string;
  database: string;
}

export const DefaultMongoConfig: IMongoConfig = {
  connectionString: 'mongodb://localhost:27017',
  database: 'default_db',
};
