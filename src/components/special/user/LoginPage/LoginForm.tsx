
import {useState} from 'react';
import {useAppSelector, useAppDispatch} from '@/store';
import {strlang} from '@/units/lang';
import {UserLoginInfo, UserLoginStatus} from '@/units/user';
import {queryUserLogin} from '@/store/user';
import _ from 'lodash';
import css from './LoginForm.module.scss';

export function LoginForm() {

  const lang = useAppSelector(state => state.settings.lang);
  const userLoginResult = useAppSelector(state => state.user.userLogin.userLoginResult);
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState('');
  const [passw, setPassw] = useState('');

  const loginOnInput = function(ev: React.ChangeEvent<HTMLInputElement>) {
    setLogin(ev.currentTarget.value);
  }

  const passwOnInput = function(ev: React.ChangeEvent<HTMLInputElement>) {
    setPassw(ev.currentTarget.value);
  }

  const userLoginOnSubmit = async function(ev: React.FormEvent) {
    ev.preventDefault();
    await dispatch(queryUserLogin({login, passw} as UserLoginInfo));
  }

  let errorMsg = '';
  switch (userLoginResult.userLoginStatus) {
    case UserLoginStatus.INCORRECT_LOGIN: {
      errorMsg = strlang('LOGIN_INCORRECT_LOGIN', lang);
    } break;

    case UserLoginStatus.INCORRECT_PASSW: {
      errorMsg = strlang('LOGIN_INCORRECT_PASSW', lang);
    } break;

    case UserLoginStatus.ERROR: {
      errorMsg = strlang('LOGIN_ERROR', lang);
    } break;
  }

  return (
    <div className={css['body']}>
      <form className={css['form']} onSubmit={userLoginOnSubmit}>

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
            {strlang('LOGIN_BUTTON', lang)}
          </button>
        </div>

      </form>
    </div>
  )
}