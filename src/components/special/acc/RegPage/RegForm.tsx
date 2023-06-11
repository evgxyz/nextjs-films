
import {useState} from 'react';
import {useAppSelector, useAppDispatch} from '@/store';
import {strlang} from '@/units/lang';
import {AccRegInfo, AccRegStatus} from '@/units/acc';
import {queryAccReg} from '@/store/acc';
import _ from 'lodash';
import css from './RegForm.module.scss';

export function RegForm() {

  const lang = useAppSelector(state => state.settings.lang);
  const accReg = useAppSelector(state => state.acc.accReg);
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState('');
  const [passw, setPassw] = useState('');

  const loginOnInput = function(ev: React.ChangeEvent<HTMLInputElement>) {
    setLogin(ev.currentTarget.value);
  }

  const passwOnInput = function(ev: React.ChangeEvent<HTMLInputElement>) {
    setPassw(ev.currentTarget.value);
  }

  const accRegOnSubmit = function(ev: React.FormEvent) {
    ev.preventDefault();
    dispatch(queryAccReg({login, passw} as AccRegInfo))
  }

  let errorMsg = '';
  switch (accReg.accRegStatus) {
    case AccRegStatus.LOGIN_OCCUPIED: {
      errorMsg = strlang('REG_LOGIN_OCCUPIED', lang);
    } break;

    case AccRegStatus.ERROR: {
      errorMsg = strlang('REG_ERROR', lang);
    } break;
  }

  return (
    <form className={css['form']} onSubmit={accRegOnSubmit}>

      { errorMsg !== '' && 
        <div className={css['error-msg']}>
          {errorMsg}
        </div>
      }

      <div className={css['login']}>
        <input type='text' value={login} onInput={loginOnInput} />
      </div>

      <div className={css['passw']}>
        <input type='password' value={passw} onInput={passwOnInput} />
      </div>

      <div className={css['btn']}>
        <button type='submit'>
          {strlang('REG_BUTTON', lang)}
        </button>
      </div>

    </form>
  )
}