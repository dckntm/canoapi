import { injectAppConfig } from '../config';
import { DefaultJWTConfig } from './jwtConfig';
import { JWTService } from './jwtService';

export const injectJWTConfig = () => {
  const config = injectAppConfig();
  const jwtConfig = DefaultJWTConfig;

  config.bind('jwt', jwtConfig);

  return jwtConfig;
};

export const injectJWTService = (): JWTService => new JWTService();
