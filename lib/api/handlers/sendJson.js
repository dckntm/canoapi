import { Exception } from 'exception';
export const sendJson = (body) => (context) => {
    if (context.finished)
        throw Exception.api()
            .withMessage('Cannot send json as request is already finished')
            .from('SendJson');
    context.response.json(body);
    context.finished = true;
};
