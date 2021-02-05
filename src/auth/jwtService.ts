import * as jwt from 'jsonwebtoken';
import { Exception } from '../exception';
import { injectJWTConfig } from './injections';

export const createJWT = (payload: any) => {
    const jwtConfig = injectJWTConfig();
    try {
        const token = jwt.sign(payload, jwtConfig.secret_key, { expiresIn: jwtConfig.expires_In })
        return {
            new_token: token,
            expires: jwtConfig.expires_In
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
        return jwt.verify(token, jwtConfig.secret_key, { complete: true });
    }
    catch (e) {
        throw Exception.api()
            .withMessage('Cannot validate token')
            .from('jwtService')
            .withMeta(e);
    }
}
