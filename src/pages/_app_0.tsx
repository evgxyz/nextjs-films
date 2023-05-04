
import App, { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { wrapper } from '@/store';
import Cookie from 'cookie';
import { setSettingsFromCookies } from '@/store/settings';
import '@/styles/global.scss';

interface PageProps {
  pageProps: {
    myVal: number;
  };
}

const MyApp = ({Component, ...rest}: AppProps) => {
  
  //console.log('rest: ', rest);
  const {store, props} = wrapper.useWrappedStore(rest);

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