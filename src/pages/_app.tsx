
import type { AppProps } from 'next/app'
//import { Provider as ReduxProvider } from 'react-redux'
//import { store } from '@/store';
import { wrapper } from '@/store';
import '@/styles/global.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default wrapper.withRedux(App);