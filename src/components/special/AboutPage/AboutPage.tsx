
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import {MainLayout} from '@/components/layouts/MainLayout';
import {NavStack} from '@/units/page-env';
import _ from 'lodash';

export function AboutPage() {

  const lang = useAppSelector(state => state.settings.lang);

  const title = strlang('ABOUT_PAGE_TITLE', lang);

  const navStack: NavStack = [
    {url: '/', text: 'Главная'},
    {url: '/about', text: title},
  ];

  return (
    <MainLayout pageEnv={{title, navStack}}>
      <h1>{title}</h1>
    </MainLayout>
  )
}