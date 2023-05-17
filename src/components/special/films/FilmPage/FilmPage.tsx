
import {useAppSelector} from '@/store';
import {ReqStatus} from '@/units/status';
import {strlang} from '@/units/lang';
import {MainLayout} from '@/components/layouts/MainLayout';
import {MessagePage} from '@/components/general/MessagePage';
import {MessageBox} from '@/components/general/MessageBox';
import styles from './FilmPage.module.scss'

export function FilmPage() {

  const lang = useAppSelector(state => state.settings.lang);
  const filmPage = useAppSelector(state => state.filmPage);
  const {reqStatus, film} = filmPage;

  console.log('reqStatus:', reqStatus)

  let title = '';
  let content = <></>;

  switch (reqStatus) {
    case ReqStatus.OK: {
      title = film.title;
      content = (
        <>
          <h1>{film.title}</h1>
          <div>{`lang=${lang}`}</div>
          <pre>{JSON.stringify(filmPage, null, 2)}</pre>
        </>
      )
    } 
    break;
    case ReqStatus.LOADING: {
      content = <MessageBox type={'INFO'} title={strlang('LOADING', lang)} />
    } 
    break;
    case ReqStatus.ERROR: {
      content = <MessageBox type={'ERROR'} title={strlang('ERROR', lang)} />
    } 
    break;
    case ReqStatus.NOT_FOUND: {
      return <MessagePage type={'ERROR'} title={strlang('NOT_FOUND', lang)} />
    } 
  }

  return (
    <MainLayout pageEnv={{title}}>
      {content}
    </MainLayout>
  )
}