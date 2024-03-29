
import {useState} from 'react';
import {useAppSelector, useAppDispatch} from '@/store';
import {strlang} from '@/units/lang';
import {UserRegInfo, UserRegStatus} from '@/units/user';
import {queryUserReg} from '@/store/user';
import _ from 'lodash';
import css from './RegForm.module.scss';

export function RegForm() {

  const lang = useAppSelector(state => state.settings.lang);
  const userRegResult = useAppSelector(state => state.user.userReg.userRegResult);
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState('');
  const [passw, setPassw] = useState('');

  const loginOnInput = function(ev: React.ChangeEvent<HTMLInputElement>) {
    setLogin(ev.currentTarget.value);
  }

  const passwOnInput = function(ev: React.ChangeEvent<HTMLInputElement>) {
    setPassw(ev.currentTarget.value);
  }

  const userRegOnSubmit = async function(ev: React.FormEvent) {
    ev.preventDefault();
    await dispatch(queryUserReg({login, passw} as UserRegInfo));
  }

  let errorMsg = '';
  switch (userRegResult.userRegStatus) {
    case UserRegStatus.LOGIN_OCCUPIED: {
      errorMsg = strlang('REG_LOGIN_OCCUPIED', lang);
    } break;

    case UserRegStatus.ERROR: {
      errorMsg = strlang('REG_ERROR', lang);
    } break;
  }

  return (
    <div className={css['body']}>
      <form className={css['form']} onSubmit={userRegOnSubmit}>

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
    </div>
  )
}