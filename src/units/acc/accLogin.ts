
import {ReqStatus} from '@/units/status';

//login
export interface AccLoginInfo {
  login: string,
  passw: string
}

export enum AccLoginStatus {
  NONE = 'NONE',
  LOGINED = 'LOGINED',
  INCORRECT_LOGIN = 'INCORRECT_LOGIN',
  INCORRECT_PASSW = 'INCORRECT_PASSW',
  ERROR = 'ERROR'
}

export interface AccLoginResult {
  login: string,
  accLoginStatus: AccLoginStatus
}

export const accLoginResultDefault: AccLoginResult = { 
  login: '',
  accLoginStatus: AccLoginStatus.NONE
}

//login store
export interface AccLoginState {
  accLoginResult: AccLoginResult & {reqStatus: ReqStatus}
}

export const accLoginStateDefault: AccLoginState = {
  accLoginResult: {
    ...accLoginResultDefault, 
    reqStatus: ReqStatus.NONE
  }
}