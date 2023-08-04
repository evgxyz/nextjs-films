
import {useState, useId} from 'react';

interface CheckboxListProps<IdType extends (number | string)> {
  title: string,
  options: {id: IdType, name: string}[],
  checkedIds?: IdType[],
  onChange: (id: IdType) => void,
  css: {readonly [key: string]: string},
}

export function CheckboxList<IdType extends (number | string)>({
  title,
  options,
  checkedIds = [],
  onChange,
  css
}: CheckboxListProps<IdType>) {
//
  const elemId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const itemOnChange = function(itemId: IdType) {
    onChange(itemId);
  }

  const titleOnClick = function() {
    setIsOpen(st => !st);
  }

  const bodyOnBlur = function(ev: React.FocusEvent) {
    if (!ev.relatedTarget?.closest('#' + elemId.replace(/:/g, '\\:'))) {
      setIsOpen(false);
    }
  }

  return (
    <div 
      id={elemId}
      className={[css['body'], isOpen ? css['--open'] : css['--closed']].join(' ')}
      tabIndex={0}
      onBlur={bodyOnBlur}
    >
      <div className={css['title']} onClick={titleOnClick}>
        {title}
        <span className={css['title__icon']}></span>
      </div>
      <div className={css['list-wrapper']}>
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
    </div>
  );
}