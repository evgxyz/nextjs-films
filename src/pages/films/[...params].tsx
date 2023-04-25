
import {useEffect} from 'react'
import {useRouter} from 'next/router'

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
    <>
      <h1>Films</h1>
      <button onClick={handlerOnClick}>Click</button>
    </>
  )
}