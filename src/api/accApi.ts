
import {Lang} from '@/units/lang';
import {ReqStatus} from '@/units/status';
import {AccRegInfo, AccRegStatus, AccRegResult} from '@/units/acc';
import {signCompare, delay} from '@/units/utils';
import _ from 'lodash';

export async function apiQueryAccReg(accRegInfo: AccRegInfo): 
  Promise<{reqStatus: ReqStatus} & {accRegResult?: AccRegResult}> {
//
  console.log('call apiQueryAccReg');
  await delay(1000);

  //create acc
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
