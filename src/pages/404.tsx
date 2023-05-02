
import { langStr } from '@/units/locale'
import { MessagePage } from '@/components/general/MessagePage';

export default function Page404() {
  return <MessagePage type={'ERROR'} title={langStr('WRONG_URL')} />
}