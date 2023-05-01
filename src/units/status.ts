
export enum PageStatus {
  NONE = 'NONE',
  OK = 'OK',
  WRONG_URL = 'WRONG_URL',
  ERROR = 'ERROR',
}

export enum ReqStatus {
  NONE = 'NONE',
  LOADING = 'LOADING',
  OK = 'OK',
  NOT_FOUND = 'NOT_FOUND',
  ERROR = 'ERROR',
}

export function isReqError(reqStatus: ReqStatus) {
  const errorReqStatusArr = [
    ReqStatus.NOT_FOUND,
    ReqStatus.ERROR
  ];
  return errorReqStatusArr.includes(reqStatus);
}

export function reqErrorToHttpCode(reqStatus: ReqStatus) {
  switch (reqStatus) {
    case ReqStatus.NOT_FOUND: 
      return 404;
    case ReqStatus.ERROR: 
      return 500;
    default: 
      return 200;
  }
}
