
import {useState, useId} from 'react';

interface SelectProps {
  value?: string,
  options: {value: string, text: string}[],
  onSelect: (value: string) => void,
  css: {readonly [key: string]: string},
}

export function Select(props: SelectProps) {
  const {
    value,
    options, 
    onSelect,
    css
  } = props;

  const elemId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const title = options
    .find(item => item.value === value)?.text 
    ?? options[0]?.text ?? '';

  const titleOnClick = function() {
    setIsOpen(isOpen => !isOpen);
  }

  const itemOnClick = function(value: string) {
    onSelect(value);
    setIsOpen(false);
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
      <div 
        className={css['title']} 
        onClick={titleOnClick}
        tabIndex={0}
      >
        {title}
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