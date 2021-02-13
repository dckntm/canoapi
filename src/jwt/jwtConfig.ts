export interface IJwtConfig {
  secretKey: string;
  issuer: string;
  validIssuer: string;
  validateAudience: boolean;
  validateIssuer: boolean;
  validateLifetime: boolean;
  expiresIn: string;
}

export const DefaultJWTConfig: IJwtConfig = {
  secretKey: 'Y2Fub2FwaV9rZXk=',
  issuer: 'canoapi',
  validIssuer: 'canoapi',
  validateAudience: false,
  validateIssuer: true,
  validateLifetime: true,
  expiresIn: '1h',
};
