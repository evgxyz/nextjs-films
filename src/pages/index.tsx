
import Link from 'next/link'
import { MainLayout } from '@/components/general/MainLayout/MainLayout'

export default function Index() {
  return (
    <MainLayout title={'Index page'}>
      <h1>Hello!</h1>
      <p><Link href='/about'>About</Link></p>
      <p><a href="/films/abc+xyz">Films</a></p>
    </MainLayout>
  )
}