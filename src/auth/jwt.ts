export interface IJWTConfig {
    secret_key: string,
    expires_In: string
}

export const DefaultJWTConfig: IJWTConfig = {
    secret_key: 'Y2Fub2FwaV9rZXk=',
    expires_In: '1h'
}