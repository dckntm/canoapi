import * as jwt from 'jsonwebtoken';
import { Exception } from '../exception';
import { injectJWTConfig } from './injections';

export const createJWT = (payload: any) => {
    const jwtConfig = injectJWTConfig();
    try {
        const token = jwt.sign(payload, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn, issuer: jwtConfig.issuer })
        return {
            new_token: token,
            expires: jwtConfig.expiresIn
        };
    }
    catch (e) {
        throw Exception.api()
            .withMessage('Cannot sign token')
            .from('jwtService')
            .withMeta(e);
    }
}

export const validateJWT = (token: string) => {
    const jwtConfig = injectJWTConfig();
    try {
        return jwt.verify(token, jwtConfig.secretKey, { complete: true, ignoreExpiration: !jwtConfig.validateLifetime, issuer: jwtConfig.validIssuer });
    }
    catch (e) {
        throw Exception.api()
            .withMessage('Cannot validate token')
            .from('jwtService')
            .withMeta(e);
    }
}
