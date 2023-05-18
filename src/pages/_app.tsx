
import App, {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {Provider as ReduxProvider} from 'react-redux';
import {wrapper} from '@/store';
import {setSettingsFromCookies, setLang} from '@/store/settings';
import {Lang, isLang} from '@/units/lang';
import Cookie from 'cookie';
import '@/styles/global.scss';

interface PageProps {
  pageProps: {
    myVal: number;
  };
}

const MyApp = ({Component, ...restProps}: Omit<AppProps, 'pageProps'> & PageProps) => {
  
  const {store, props} = wrapper.useWrappedStore(restProps);

  const router = useRouter();
  const lang = router.query.lang;
  if (isLang(lang)) {
    store.dispatch(setLang(lang as Lang));
  }

  return (
    <ReduxProvider store={store}>
      <Component {...props.pageProps} />
    </ReduxProvider>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async(appCtx) => {

  const cookie = appCtx.ctx.req?.headers.cookie;
  //console.log('cookie:', cookie);

  if (cookie) {
    const cookies = Cookie.parse(cookie);
    store.dispatch(setSettingsFromCookies(cookies));
  }

  const childrenGip = await App.getInitialProps(appCtx);
  //console.log('childInitialProps: ', childrenGip);

  return {
    pageProps: {
      ...childrenGip.pageProps,
      myVal: 123,
    }
  };
});

export default MyApp;

// legacy 
/* function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}
export default wrapper.withRedux(App); */