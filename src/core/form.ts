import * as Yup from 'yup';

export type Form<T extends Yup.AnyObjectSchema> = Yup.InferType<T>;
 