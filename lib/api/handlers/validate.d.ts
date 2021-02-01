import { IHttpContext } from 'api';
import * as Yup from 'yup';
export declare const Validate: (schema: Yup.AnyObjectSchema) => (context: IHttpContext) => Promise<void>;
