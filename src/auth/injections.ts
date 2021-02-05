import { injectAppConfig } from '../config'
import { DefaultJWTConfig } from './jwt'

export const injectJWTConfig = () => {
    const config = injectAppConfig();
    const jwtConfig = DefaultJWTConfig;
    config.bind('jwt', jwtConfig);
    return jwtConfig;
}