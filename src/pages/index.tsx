
import Link from 'next/link'
import { MainLayout } from '@/components/general/MainLayout/MainLayout'

export default function Index() {
  return (
    <MainLayout title={'Index page'}>
      <h1>Hello! This is test commit for dev branch</h1>
      <p><Link href='/about'>About</Link></p>
      <p><Link href="/film/1">Film</Link></p>
    </MainLayout>
  )
}