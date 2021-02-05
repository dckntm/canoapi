import { IHttpContext } from '..';
import * as jwt from 'jsonwebtoken';
import { injectJWTConfig } from '../../auth/injections';
import { Exception } from '../../exception';
import { StatusCode } from '../../core';

export const authorizeBearer = (context: IHttpContext) => {
   const jwtConfig = injectJWTConfig();
   const headers = context.request.headers['authorization'];
   const token = headers?.split('')[1];
   if (token != null) {
      try {
         const payload = jwt.verify(token, jwtConfig.secretKey, { ignoreExpiration: !jwtConfig.validateLifetime, issuer: jwtConfig.validIssuer });
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

