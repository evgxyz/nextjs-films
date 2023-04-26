
export enum ApiStatus {
  OK = 'OK',
  NOT_FOUND = 'NOT_FOUND',
  ERROR = 'ERROR',
}

export interface ApiResult {
  apiStatus: ApiStatus,
}