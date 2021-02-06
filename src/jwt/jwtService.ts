import * as jwt from 'jsonwebtoken';
import { Exception } from '../exception';
import { injectJWTConfig } from './injections';
import { IJWTConfig } from './jwtConfig';

export class JWTService {
  private jwtConfig: IJWTConfig;

  public constructor() {
    this.jwtConfig = injectJWTConfig();
  }

  public createJWT = (payload: any) => {
    try {
      return jwt.sign(payload, this.jwtConfig.secretKey, {
        expiresIn: this.jwtConfig.expiresIn,
        issuer: this.jwtConfig.issuer,
      });
    } catch (e) {
      throw Exception.api()
        .withMessage('Cannot sign token')
        .from('jwtService')
        .withMeta(e);
    }
  };

  public validateJWT = (token: string) => {
    try {
      return jwt.verify(token, this.jwtConfig.secretKey, {
        complete: true,
        ignoreExpiration: !this.jwtConfig.validateLifetime,
        issuer: this.jwtConfig.validIssuer,
      });
    } catch (e) {
      throw Exception.api()
        .withMessage('Cannot validate token')
        .from('jwtService')
        .withMeta(e);
    }
  };
}
