
import {ReqStatus} from '@/units/status';
import {
  UserRegInfo, UserRegStatus, UserRegResult,
  UserLoginInfo, UserLoginStatus, UserLoginResult,
} from '@/units/user';
import {delay} from '@/units/utils';
import _ from 'lodash';

export async function apiQueryUserReg(userRegInfo: UserRegInfo): 
  Promise<{reqStatus: ReqStatus} & {userRegResult?: UserRegResult}> {
//
  console.log('call apiQueryUserReg');
  await delay(1000);

  const userRegResult: UserRegResult = {
    login: userRegInfo.login,
    userRegStatus: UserRegStatus.CREATED
  }

  if (userRegResult) {
    return {
      userRegResult,
      reqStatus: ReqStatus.OK
    }
  } else {
    return {
      reqStatus: ReqStatus.ERROR
    }
  }
}

export async function apiQueryUserLogin(userLoginInfo: UserLoginInfo): 
  Promise<{reqStatus: ReqStatus} & {userLoginResult?: UserLoginResult}> {
//
  console.log('call apiQueryUserLogin');
  await delay(1000);

  const userLoginResult: UserLoginResult = {
    login: userLoginInfo.login,
    userLoginStatus: UserLoginStatus.LOGINED
  }

  if (userLoginResult) {
    return {
      userLoginResult,
      reqStatus: ReqStatus.OK
    }
  } else {
    return {
      reqStatus: ReqStatus.ERROR
    }
  }
}
