
import {useRouter} from 'next/router';
import {useAppSelector} from '@/store';
import {normalizeURL} from '@/units/url';
import {strlang} from '@/units/lang';
import {MainLayout} from '@/components/layouts/MainLayout';
import {PageTitle} from '@/components/general/PageTitle';
import _ from 'lodash';

export function AboutPage() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);

  const title = strlang('ABOUT_PAGE_TITLE', lang);
  const subTitle = strlang('ABOUT_PAGE_SUBTITLE', lang);
  const pageEnv = {
    title,
    navStack: [{url: normalizeURL(router.asPath), text: title}],
    description: 'About lorem ipsum dolor sit',
    keywords: 'about, lorem, ipsum, dolor'
  }
  
  return (
    <MainLayout pageEnv={pageEnv}>
      <PageTitle 
        title={title} 
        subTitle={subTitle} 
      />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, neque? Doloribus veritatis, numquam, totam nihil maiores voluptatibus placeat quo qui, rem consequatur dolorum nobis alias minus sunt rerum optio facere tenetur eligendi provident iste veniam dolores? Iure in accusantium repudiandae debitis, blanditiis reiciendis dolorem tempore eum reprehenderit, dolores unde aperiam numquam inventore nesciunt, amet vel velit. Aspernatur earum temporibus repellat quos ducimus harum vitae modi facilis id possimus quam veniam, ex iure, nesciunt illum cumque nostrum aliquid repellendus eum atque. Quasi fuga magnam porro nobis assumenda commodi natus omnis. Omnis hic, quibusdam est culpa molestias nihil, consequatur sed vel ipsa cumque dicta quidem officia itaque eveniet. Provident, esse. Sunt, nisi dignissimos?</p>
      <p>Suscipit, perferendis placeat doloremque fuga veritatis eligendi earum voluptate iusto reprehenderit rem obcaecati facere ad quae tenetur dolore repellat soluta in corporis harum itaque, laborum alias. Aut aperiam optio minus est voluptatum. Explicabo ab accusantium similique mollitia ratione eaque earum id veritatis, quo sequi doloremque numquam? Velit beatae similique ea! Inventore, temporibus accusamus. Sed, nesciunt dicta? Dolore impedit sapiente libero iusto et cupiditate, qui cumque itaque voluptatibus! Quasi nemo impedit tempora sed, ipsum illum voluptate molestias, dignissimos facilis, beatae voluptatum. Eveniet odio iure distinctio impedit ducimus quaerat quia amet atque ipsum iste libero totam nihil sint numquam, mollitia voluptatum. Optio praesentium, officiis id vel nesciunt magnam ad debitis iure quis. Aspernatur reprehenderit quo animi perspiciatis exercitationem ullam error a, officia tempora, provident eos dignissimos.</p>
    </MainLayout>
  )
}