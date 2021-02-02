export interface IServerConfig {
  baseUrl: string;
  name: string;
  version: string;
  port: number;
}

export const DefaultServerConfig: IServerConfig = {
  baseUrl: '',
  name: 'server',
  version: 'v1',
  port: 8080,
};
