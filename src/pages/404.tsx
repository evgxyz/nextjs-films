
import { useAppSelector } from '@/store';
import { locstr } from '@/units/locale'
import { MessagePage } from '@/components/general/MessagePage';

export default function Page404() {
  const lang = useAppSelector(state => state.settings.lang);
  return <MessagePage type={'ERROR'} title={locstr('WRONG_URL', lang)} />
}