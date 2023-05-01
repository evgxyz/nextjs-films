
import Link from 'next/link';
import { MainLayout } from '@/components/layouts/MainLayout';
import { range } from '@/units/utils'

export default function Index() {
  return (
    <MainLayout title={'Index page'}>
      <h1>Hello!</h1>
      <p><Link href='/films'>Films</Link></p>
      <p><Link href='/about'>About</Link></p>
      <p><Link href='/film/abc'>Wrong</Link></p>
      <ul>
        {
          range(1, 5).map(i => 
            <li key={i}><Link href={`/film/${i}`}>{`Film ${i}`}</Link></li>
          )
        }
      </ul>
    </MainLayout>
  )
}