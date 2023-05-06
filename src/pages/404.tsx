
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import {MessagePage} from '@/components/general/MessagePage';

export default function Page404() {
  const lang = useAppSelector(state => state.settings.lang);
  return <MessagePage type={'ERROR'} title={strlang('WRONG_URL', lang)} />
}