
import {ReqStatus} from '@/units/status';
import {
  AccRegInfo, AccRegStatus, AccRegResult,
  AccLoginInfo, AccLoginStatus, AccLoginResult,
} from '@/units/acc';
import {delay} from '@/units/utils';
import _ from 'lodash';

export async function apiQueryAccReg(accRegInfo: AccRegInfo): 
  Promise<{reqStatus: ReqStatus} & {accRegResult?: AccRegResult}> {
//
  console.log('call apiQueryAccReg');
  await delay(1000);

  const accRegResult: AccRegResult = {
    login: accRegInfo.login,
    accRegStatus: AccRegStatus.CREATED
  }

  if (accRegResult) {
    return {
      accRegResult,
      reqStatus: ReqStatus.OK
    }
  } else {
    return {
      reqStatus: ReqStatus.ERROR
    }
  }
}

export async function apiQueryAccLogin(accLoginInfo: AccLoginInfo): 
  Promise<{reqStatus: ReqStatus} & {accLoginResult?: AccLoginResult}> {
//
  console.log('call apiQueryAccLogin');
  await delay(1000);

  const accLoginResult: AccLoginResult = {
    login: accLoginInfo.login,
    accLoginStatus: AccLoginStatus.LOGINED
  }

  if (accLoginResult) {
    return {
      accLoginResult,
      reqStatus: ReqStatus.OK
    }
  } else {
    return {
      reqStatus: ReqStatus.ERROR
    }
  }
}
