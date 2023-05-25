
export enum ReqStatus {
  NONE = 'NONE',
  LOADING = 'LOADING',
  OK = 'OK',
  NOT_FOUND = 'NOT_FOUND',
  ERROR = 'ERROR',
}

export function isReqStatusOK(reqStatus: ReqStatus) {
  return (reqStatus === ReqStatus.OK);
}

export function isReqStatusError(reqStatus: ReqStatus) {
  const errorReqStatusArr = [
    ReqStatus.NOT_FOUND,
    ReqStatus.ERROR
  ];
  return errorReqStatusArr.includes(reqStatus);
}

export function reqStatusToHttpCode(reqStatus: ReqStatus) {
  switch (reqStatus) {
    case ReqStatus.NOT_FOUND: 
      return 404;
    case ReqStatus.ERROR: 
      return 500;
    default: 
      return 200;
  }
}
