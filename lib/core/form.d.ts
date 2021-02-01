import * as Yup from 'yup';
export declare type Form<T extends Yup.AnyObjectSchema> = Yup.InferType<T>;
