
import type { AppProps, AppContext } from 'next/app'
//import { Provider as ReduxProvider } from 'react-redux'
//import { store } from '@/store';
import { wrapper } from '@/store';
import { cookies } from 'next/headers';
import '@/styles/global.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

/* App.getInitialProps = ({ ctx }: AppContext) => {
  if (ctx.req) { // on server 
    const cookieStore = cookies();
    console.log(cookieStore.get('settings'));
  } 
  else { // on client
    
  }
} */

export default wrapper.withRedux(App);