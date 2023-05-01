
import { langStr } from '@/units/lang'
import { MessagePage } from '@/components/general/MessagePage';

export default function Page404() {
  return <MessagePage type={'ERROR'} title={langStr('NOT_FOUND')} />
}