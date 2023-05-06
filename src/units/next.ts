
export enum GipStatus {
  NONE = 'NONE',
  OK = 'OK',
  WRONG_URL = 'WRONG_URL',
  ERROR = 'ERROR',
}

export interface NextPageProps {
  fromClient: boolean,
  gipStatus: GipStatus
}
