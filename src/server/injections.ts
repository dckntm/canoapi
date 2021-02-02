import { Server } from './server';
import { ApiRouter } from '../api';
import { injectAppConfig } from '../config';
import { DefaultServerConfig, IServerConfig } from './serverConfig';

export const injectServerConfig = (): IServerConfig => {
  const config = injectAppConfig();
  const serverConfig = DefaultServerConfig;
  config.bind('server', serverConfig);

  return serverConfig;
};

// we suggest to write code like
// createServer(/* some service configuration function here */)
//    .withRouter(SomeRouter)
// /* some more routers here */
//    .run();
export const createServer = (
  configureServices: (server: Server) => Promise<void> | void,
  ...routers: ApiRouter[]
) => {
  const server = new Server(configureServices);
  routers.forEach((router) => server.withRouter(router));

  return server;
};
