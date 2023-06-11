
import {ReqStatus} from '@/units/status';

//reg
export interface AccRegInfo {
  login: string,
  passw: string
}

export enum AccRegStatus {
  NONE = 'NONE',
  CREATED = 'CREATED',
  LOGIN_OCCUPIED = 'LOGIN_OCCUPIED',
  ERROR = 'ERROR'
}

export interface AccRegResult {
  login: string,
  accRegStatus: AccRegStatus
}

export const accRegResultDefault: AccRegResult = { 
  login: '',
  accRegStatus: AccRegStatus.NONE
}

//reg store
export interface AccRegState extends AccRegResult {
  reqStatus: ReqStatus
}

export const accRegStateDefault: AccRegState = {
  ...accRegResultDefault, 
  reqStatus: ReqStatus.NONE
}