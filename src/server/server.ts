import bodyParser from 'body-parser';
import express from 'express';
import { ApiRouter } from '../api';
import { injectLogService } from '../log';
import { injectServerConfig } from './injections';
import { IServerConfig } from './serverConfig';

export class Server {
  public readonly server: express.Express;
  protected readonly config: IServerConfig;
  protected configureServer: (server: Server) => void | Promise<void>;
  protected routers: ApiRouter[] = [];

  constructor(configureServer: (server: Server) => void | Promise<void>) {
    this.server = express();
    this.config = injectServerConfig();
    this.configureServer = configureServer;
  }

  public async run(callback: () => void = () => {}): Promise<void> {
    // function for setting up mongo db connection
    // and configuring event bus and any other configurable
    // singleton services
    await this.configureServer(this);

    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());

    for (const router of this.routers)
      this.server.use(this.config.baseUrl, router.apply());

    this.server.listen(this.config.port, () => {
      const logger = injectLogService();
      logger.info(
        `Running server [${this.config.name}].[${this.config.version}] on localhost:${this.config.port} with base URL \'${this.config.baseUrl}\'`,
      );

      callback();
    });
  }

  public withRouter(router: ApiRouter): this {
    this.routers.push(router);

    return this;
  }
}
