
import {useRouter} from 'next/router';
import {useState, useId} from 'react';
import {useAppSelector} from '@/store';
import {normalizeURL} from '@/units/url';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import {MainLayout} from '@/components/layouts/MainLayout';
import {LoadingBox} from '@/components/common/LoadingBox';
import _ from 'lodash';
import css from './RegPage.module.scss';
import { PageTitle } from '@/components/general/PageTitle';

export function RegPage() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);

  const [login, setLogin] = useState('');
  const [passw, setPassw] = useState('');

  const title = strlang('REG_PAGE_TITLE', lang);
  const pageEnv = {
    title,
    navStack: [{url: normalizeURL(router.asPath), text: title}],
  }

  const loginOnInput = function(ev: React.ChangeEvent<HTMLInputElement>) {
    setLogin(ev.currentTarget.value);
  }

  const passwOnInput = function(ev: React.ChangeEvent<HTMLInputElement>) {
    setPassw(ev.currentTarget.value);
  }

  const regOnSubmit = function(ev: React.FormEvent) {
    ev.preventDefault();
  }

  return (
    <MainLayout pageEnv={pageEnv}>
      <PageTitle title={title} />
      <div className={css['body']}>
        <form className={css['form']} onSubmit={regOnSubmit}>

          <div className={css['login']}>
            <input type='text' value={login} onInput={loginOnInput} />
          </div>

          <div className={css['passw']}>
            <input type='text' value={passw} onInput={passwOnInput} />
          </div>

          <div className={css['btn']}>
            <button type='submit'>
              {strlang('REGISTER_BUTTON')}
            </button>
          </div>

        </form>
      </div>
    </MainLayout>
  )
}