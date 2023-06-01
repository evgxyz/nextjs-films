
import {useState, useId} from 'react';
import css from './CheckboxList.module.scss';

interface CheckboxListProps<IdType extends (number | string)> {
  title: string,
  options: {id: IdType, name: string}[],
  checkedIds?: IdType[],
  callbackOnChange: (id: IdType) => void,
}

export function CheckboxList<IdType extends (number | string)>(
  props: CheckboxListProps<IdType>) {
//
  const {
    title,
    options,
    checkedIds = [],
    callbackOnChange
  } = props;

  const elemId = useId();
  const [expand, setExpand] = useState(true);

  const itemOnChange = function(itemId: IdType) {
    callbackOnChange(itemId);
  }

  const titleOnClick = function() {
    setExpand(st => !st);
  }

  const bodyOnBlur = function(ev: React.FocusEvent) {
    if (!ev.relatedTarget?.closest('#' + elemId.replace(/:/g, '\\:'))) {
      setExpand(false);
    }
  }

  return (
    <div 
      id={elemId}
      className={[css['body'], expand ? css['--expand'] : ''].join(' ')}
      tabIndex={0}
      onBlur={bodyOnBlur}
    >
      <div className={css['title']} onClick={titleOnClick}>
        {title}
        <span className={css['title-icon']}></span>
      </div>
      <ul className={css['list']}>
        { options.map(item =>
            <li key={item.id}>
              <label>
                <input type='checkbox' 
                  checked={checkedIds.includes(item.id)} 
                  onChange={() => {itemOnChange(item.id)}}
                />
                {item.name}
              </label>
            </li>
          )
        }
      </ul>
    </div>
  );
}