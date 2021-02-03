import { HttpMethod } from '../core';
import { Router, Request, Response } from 'express';
import { LogService } from '../log';
import { compose, end, handleException } from './handlers';
import { HttpContext } from './httpContext';
import { HttpHandler } from './httpHandler';

// TODO: add route parsing for getting rid of accidental '//'
interface IRoute {
  path: string;
  method: HttpMethod;
  handler: HttpHandler;
}

export class ApiRouter<TMeta = any> {
  constructor(
    private base: string,
    private defaultHandlers: HttpHandler[] = [],
    private routes: IRoute[] = [],
    private defaultMeta?: TMeta,
  ) {}

  public apply(): Router {
    const log = LogService.getInstance();
    const router = Router();

    log.info(`Applying router: ${this.constructor.name}`);

    for (const route of this.routes) {
      const path = `${this.base}${route.path}`;

      const handler = async (request: Request, response: Response) => {
        log.info(`Calling ${request.method} ${path}`);

        const context = new HttpContext<TMeta>(
          request,
          response,
          this.defaultMeta,
        );

        try {
          await compose(...this.defaultHandlers, route.handler, end)(context);
        } catch (e) {
          await handleException(e)(context);
        }
      };

      switch (route.method) {
        case HttpMethod.GET:
          router.get(path, handler);
        case HttpMethod.POST:
          router.post(path, handler);
        case HttpMethod.PUT:
          router.put(path, handler);
        case HttpMethod.DELETE:
          router.delete(path, handler);
      }

      log.info(`Add route: ${route.method} ${path}`);
    }

    return router;
  }

  public get(path: string, handler: HttpHandler): this {
    this.routes.push({
      path,
      method: HttpMethod.GET,
      handler,
    });

    return this;
  }

  public post(path: string, handler: HttpHandler): this {
    this.routes.push({
      path,
      method: HttpMethod.POST,
      handler,
    });

    return this;
  }

  public put(path: string, handler: HttpHandler): this {
    this.routes.push({
      path,
      method: HttpMethod.PUT,
      handler,
    });

    return this;
  }

  public delete(path: string, handler: HttpHandler): this {
    this.routes.push({
      path,
      method: HttpMethod.DELETE,
      handler,
    });

    return this;
  }
}
