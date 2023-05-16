
export enum PageStatus {
  NONE = 'NONE',
  OK = 'OK',
  WRONG_URL = 'WRONG_URL',
  ERROR = 'ERROR',
}

export interface NextPageProps {
  fromServer?: boolean,
  initPageStatus?: PageStatus,
}
