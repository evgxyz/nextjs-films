
import type {Meta, StoryObj, StoryFn} from '@storybook/react';

import {InputAutocompl, InputAutocomplCss} from '.';
import {useState} from 'react';
import _ from 'lodash';

const meta: Meta<typeof InputAutocompl> = {
  title: 'InputAutocompl',
  component: InputAutocompl,
  decorators: [
    (Story: StoryFn) => (
      <div style={{width: '12rem'}}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InputAutocompl>;

/* 
const InputAutocomplFC = (props: React.ComponentProps<typeof InputAutocompl>) => {
  
  const [checkedIds, setCheckedIds] = useState(props.checkedIds ?? []);

  const callbackOnChange = (itemId: typeof checkedIds[number]) => {
    setCheckedIds(checkedIds => {
      checkedIds = [...checkedIds];
      if (!checkedIds.includes(itemId)) {
        checkedIds.push(itemId);
      } else {
        _.pull(checkedIds, itemId);
      }
      checkedIds.sort();
      return checkedIds;
    });
  } 

  return (
    <InputAutocompl 
      {...props}
      checkedIds={checkedIds}
      callbackOnChange={callbackOnChange}
    />
  );
}*/

export const Default: Story = {
  args: {
    value: 'text',
    autocompl: ['suggest 1', 'suggest 2', 'suggest 3'],
    callbackOnFocus: () => {},
    callbackOnChange: () => {},
    callbackOnSelect: () => {},
    css: InputAutocomplCss
  },
  render: (args) => (
    <InputAutocompl {...args} />
  )
};
