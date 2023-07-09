
import {useState, useId} from 'react';
import {useRouter} from 'next/router';
import {useAppSelector} from '@/store';
import {normalizeURL} from '@/units/url';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import {MainLayout} from '@/components/layouts/MainLayout';
import {PageTitle} from '@/components/general/PageTitle';
import {LoadingBox} from '@/components/common/LoadingBox';
import {Pagination} from '@/components/common/Pagination';
import {Select, SelectCss} from '@/components/common/Select';
import _ from 'lodash';
import css from './AboutPage.module.scss';

export function AboutPage() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);

  const title = strlang('ABOUT_PAGE_TITLE', lang);
  const pageEnv = {
    title,
    navStack: [{url: normalizeURL(router.asPath), text: title}],
    description: 'About lorem ipsum dolor sit',
    keywords: 'about, lorem, ipsum, dolor'
  }

  const optionsRaw = ['a', 'b', 'c'];
  const options = optionsRaw.map(value => ({value, text: 'Пункт ' + value}));
  const [current, setCurrent] = useState({value: 'a', text: 'Пункт a'});

  const onSelect = function(value: string) {
    setCurrent({value, text: 'Пункт ' + value});
  }

  return (
    <MainLayout pageEnv={pageEnv}>
      <PageTitle 
        title={title} 
        subTitle={'This is subtitle'} 
      />
      <Select
        current={current} 
        options={options}
        callbackOnSelect={value => {onSelect(value)}}
        css={SelectCss}
      />
      <p>Lorem ipsum dolor sit, 
        amet consectetur adipisicing elit. 
        Cupiditate nesciunt adipisci voluptatem ipsa alias iste dolorem officiis nisi 
        voluptatibus, iusto laborum minima illo ipsum placeat amet error incidunt tempora
        blanditiis?</p>
      <p>Lorem ipsum dolor sit, 
        amet consectetur adipisicing elit. 
        Cupiditate nesciunt adipisci voluptatem ipsa alias iste dolorem officiis nisi 
        voluptatibus, iusto laborum minima illo ipsum placeat amet error incidunt tempora
        blanditiis?</p>
      <p>Lorem ipsum dolor sit, 
        amet consectetur adipisicing elit. 
        Cupiditate nesciunt adipisci voluptatem ipsa alias iste dolorem officiis nisi 
        voluptatibus, iusto laborum minima illo ipsum placeat amet error incidunt tempora
        blanditiis?</p>
    </MainLayout>
  )
}