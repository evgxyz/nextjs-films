
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import {MainLayout} from '@/components/layouts/MainLayout';
import _ from 'lodash';

export function AboutPage() {

  const lang = useAppSelector(state => state.settings.lang);

  const title = strlang('ABOUT_PAGE_TITLE', lang);

  const navStack = [
    {url: '/about', text: title},
  ];

  return (
    <MainLayout pageEnv={{title, navStack}}>
      <h1>{title}</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate nesciunt adipisci voluptatem ipsa alias iste dolorem officiis nisi voluptatibus, iusto laborum minima illo ipsum placeat amet error incidunt tempora blanditiis?</p>
    </MainLayout>
  )
}