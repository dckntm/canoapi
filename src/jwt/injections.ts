import { injectAppConfig } from '../config';
import { DefaultJWTConfig } from './jwtConfig';
import { JwtService } from './jwtService';

export const injectJwtConfig = () => {
  const config = injectAppConfig();
  const jwtConfig = DefaultJWTConfig;

  config.bind('jwt', jwtConfig);

  return jwtConfig;
};

export const injectJwtService = (): JwtService => new JwtService();
