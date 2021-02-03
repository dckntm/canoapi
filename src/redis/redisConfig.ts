export interface IRedisConfig {
  port: number;
  host: string;
}

export const DefaultRedisConfig: IRedisConfig = {
  port: 6379,
  host: 'localhost',
};
