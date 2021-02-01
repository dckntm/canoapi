export interface IEvent<TType, TPayload> {
  type: TType;
  payload: TPayload;
}
