
import {useAppDispatch, useAppSelector} from '@/store';
import {setPageEnv} from '@/store/pageEnv';
import {ReqStatus} from '@/units/status';
import {strlang} from '@/units/lang';
import {MainLayout} from '@/components/layouts/MainLayout';
import {MessageBox} from '@/components/general/MessageBox';
import {FilmSearchFilter} from './FilmSearchFilter'; 
import styles from './FilmSearchPage.module.scss';

export function FilmSearchPage() {

  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);
  const filmSearch = useAppSelector(state => state.filmSearch);
  const {params, results, reqStatus} = filmSearch;

  let title = strlang('FILM_SEARCH_TITLE', lang);
  let content = <></>;

  switch (reqStatus) {
    case ReqStatus.OK: {
      content = (
        <>
          <pre>{JSON.stringify(filmSearch, null, 2)}</pre>
        </>
      )
    } break;
    case ReqStatus.LOADING: {
      content = <MessageBox type={'INFO'} title={strlang('LOADING', lang)} />
    } break;
    case ReqStatus.NOT_FOUND: {
      content = <MessageBox type={'ERROR'} title={strlang('NOT_FOUND', lang)} />
    } break;
    case ReqStatus.ERROR: {
      content = <MessageBox type={'ERROR'} title={strlang('ERROR', lang)} />
    } break;
  }

  dispatch(setPageEnv({title}));

  return (
    <MainLayout>
      <h1>{title}</h1>
      <FilmSearchFilter />
      {content}
    </MainLayout>
  )
}