import { injectLogService } from 'log';
export const end = (context) => {
    const log = injectLogService();
    context.response.end(() => log.info(`Request ${context.request.method} ${context.request.url} ended`));
};
