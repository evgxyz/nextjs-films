
import Link from 'next/link';
import { MainLayout } from '@/components/layouts/MainLayout';
import { range } from '@/utils'

export default function Index() {
  return (
    <MainLayout title={'Index page'}>
      <h1>Hello!</h1>
      <p><Link href='/films'>Films</Link></p>
      <p><Link href='/about'>About</Link></p>
      <ul>
        {
          range(1, 3).map(i => 
            <li key={i}><Link href={`/film/${i}`}>{`Film ${i}`}</Link></li>
          )
        }
      </ul>
    </MainLayout>
  )
}