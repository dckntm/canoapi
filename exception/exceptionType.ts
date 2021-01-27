export enum ExceptionType {
  // this errors are for failed connections and inner lib problems
  INTERNAL = 'INTERNAL',
  // this errors are for situations when business logic failed to perform something
  BUSINESS = 'BUSINESS',
  // this errors are for api layer when we fail to do something on api layer
  API = 'API',
}
