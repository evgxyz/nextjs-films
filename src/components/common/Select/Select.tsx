
import {useState, useId} from 'react';

interface SelectProps {
  text: string,
  options: {value: string, text: string}[],
  callbackOnSelect: (value: string) => void,
  css: {readonly [key: string]: string},
}

export function Select(props: SelectProps) {
  const {
    text,
    options, 
    callbackOnSelect,
    css
  } = props;

  const elemId = useId();
  const [openFlag, setOpenFlag] = useState(false);

  const titleOnClick = function() {
    setOpenFlag(st => !st);
  }

  const itemOnClick = function(value: string) {
    callbackOnSelect(value);
    setOpenFlag(false);
  }

  const bodyOnBlur = function(ev: React.FocusEvent) {
    if (!ev.relatedTarget?.closest('#' + elemId.replace(/:/g, '\\:'))) {
      setOpenFlag(false);
    }
  }

  return (
    <div 
      id={elemId} 
      className={[css['body'], openFlag ? css['--open'] : css['--closed']].join(' ')}
      tabIndex={0}
      onBlur={bodyOnBlur}
    >
      <div 
        className={css['title']} 
        onClick={titleOnClick}
        tabIndex={0}
      >
        {text}
        <span className={css['title__icon']}></span>
      </div>
      <div className={css['list-wrapper']}>
        { options && options.length > 0 &&
          <ul className={css['list']} tabIndex={0}>
            { options.map(item =>
                <li key={item.value} onClick={() => itemOnClick(item.value)}>
                  {item.text}
                </li>
              )
            }
          </ul>
        }
      </div>
    </div>
  );
}