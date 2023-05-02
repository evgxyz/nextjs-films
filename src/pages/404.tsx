
import { locstr } from '@/units/locale'
import { MessagePage } from '@/components/general/MessagePage';

export default function Page404() {
  return <MessagePage type={'ERROR'} title={locstr('WRONG_URL')} />
}