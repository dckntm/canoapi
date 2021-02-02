export interface IHttpClientConfig {
  base: string;
  defaultHeaders: any[];
}

export const DefaultHttpClientConfig: IHttpClientConfig = {
  base: '',
  defaultHeaders: [],
};
