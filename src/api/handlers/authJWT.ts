import { IHttpContext } from '..';
import * as jwt from 'jsonwebtoken';
import { injectJWTConfig } from '../../auth/injections';
import { DefaultJWTConfig } from '../../auth/jwt';
import { Exception } from '../../exception';
import { StatusCode } from '../../core';


export const validateJWT = (context: IHttpContext) => {
   const secret = DefaultJWTConfig.secret_key;
   const headers = context.request.headers['authorization'];
   const token = headers?.split('')[1];
   if (token != null) {
      try {
         const payload = jwt.verify(token, secret);
         context.meta = payload;
      }
      catch (e) {
         throw Exception.api()
            .withMessage('Cannot validate token')
            .from('validateJWT')
            .withStatusCode(StatusCode.UNAUTHORIZED)
            .withMeta(e);

      }
   }
   else {
      throw Exception.api()
         .withMessage('JWT is null')
         .from('validateJWT')

   }
}

export const createJWT = (context: IHttpContext) => {
   const secret = DefaultJWTConfig.secret_key;
   const expire = DefaultJWTConfig.expires_In;
   try {
      const token = jwt.sign(context.request.body, secret, { expiresIn: expire });
      context.meta = token; //no idea where else to save
   }
   catch (e) {
      throw Exception.api()
         .withMessage('Cannot sign token')
         .from('validateJWT')
         .withMeta(e);

   }
}