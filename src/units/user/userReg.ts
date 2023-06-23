
import {ReqStatus} from '@/units/status';

//reg
export interface UserRegInfo {
  login: string,
  passw: string
}

export enum UserRegStatus {
  NONE = 'NONE',
  CREATED = 'CREATED',
  LOGIN_OCCUPIED = 'LOGIN_OCCUPIED',
  ERROR = 'ERROR'
}

export interface UserRegResult {
  login: string,
  userRegStatus: UserRegStatus
}

export const userRegResultDefault: UserRegResult = { 
  login: '',
  userRegStatus: UserRegStatus.NONE
}

//reg store
export interface UserRegState {
  userRegResult: UserRegResult & {reqStatus: ReqStatus}
}

export const userRegStateDefault: UserRegState = {
  userRegResult: {
    ...userRegResultDefault, 
    reqStatus: ReqStatus.NONE
  }
}