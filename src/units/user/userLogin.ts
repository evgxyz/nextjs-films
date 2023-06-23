
import {ReqStatus} from '@/units/status';

//login
export interface UserLoginInfo {
  login: string,
  passw: string
}

export enum UserLoginStatus {
  NONE = 'NONE',
  LOGINED = 'LOGINED',
  INCORRECT_LOGIN = 'INCORRECT_LOGIN',
  INCORRECT_PASSW = 'INCORRECT_PASSW',
  ERROR = 'ERROR'
}

export interface UserLoginResult {
  login: string,
  userLoginStatus: UserLoginStatus
}

export const userLoginResultDefault: UserLoginResult = { 
  login: '',
  userLoginStatus: UserLoginStatus.NONE
}

//login store
export interface UserLoginState {
  userLoginResult: UserLoginResult & {reqStatus: ReqStatus}
}

export const userLoginStateDefault: UserLoginState = {
  userLoginResult: {
    ...userLoginResultDefault, 
    reqStatus: ReqStatus.NONE
  }
}