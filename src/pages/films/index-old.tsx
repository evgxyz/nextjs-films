
import {useRouter} from 'next/router'
import { MainLayout } from '@/components/layouts/MainLayout';

export default function About() {
  const router = useRouter();
  
  console.log('router:', JSON.stringify(router))

  const handlerOnClick = function() {
    const url = {
      pathname: router.pathname,
      query: { ...router.query, sort: 'year' }
    }
    router.push(url)
  }

  return (
    <MainLayout title={'Films'}>
      <h1>Films</h1>
      <button onClick={handlerOnClick}>Click</button>
    </MainLayout>
  )
}