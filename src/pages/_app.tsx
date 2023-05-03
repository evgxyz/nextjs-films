
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import App, {AppInitialProps} from 'next/app';
import { wrapper } from '@/store';
import '@/styles/global.scss';

interface PageProps {
  pageProps: {
    id: number;
  };
}

const MyApp = ({Component, ...rest}: Omit<AppProps, 'pageProps'> & PageProps) => {
  
  console.log('rest: ', rest);
  const {store, props} = wrapper.useWrappedStore(rest);

  return (
    <ReduxProvider store={store}>
      <Component {...props.pageProps} />
    </ReduxProvider>
  );
};

MyApp.getInitialProps = 
  wrapper.getInitialAppProps(store => async(appCtx) => {

  // to do dispatches first, before...
  // await store.dispatch(fetchAsinc());

  // ...before calling (and awaiting!!!!) the children's getInitialProps
  const childrenGip = await App.getInitialProps(appCtx);
  console.log('childInitialProps: ', childrenGip);

  return {
    pageProps: {
      ...childrenGip.pageProps,
      id: 42,
    },
  };
});

export default MyApp;

/* function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}
export default wrapper.withRedux(App); */