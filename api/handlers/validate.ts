import { IHttpContext } from 'api';
import { Exception } from 'exception';
import * as Yup from 'yup';

export const Validate = (schema: Yup.AnyObjectSchema) => async (
  context: IHttpContext,
): Promise<void> => {
  const body = context.request.body;

  try {
    await schema.validate(body);
  } catch (e) {
    throw Exception.api()
      .withMessage('Validation failed')
      .from('Validate')
      .withMeta({ object: body, error: e });
  }
};
