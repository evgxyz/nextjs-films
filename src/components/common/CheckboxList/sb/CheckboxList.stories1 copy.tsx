
import type {Meta, StoryObj, StoryFn} from '@storybook/react';

import {CheckboxList, CheckboxListCss} from '.';
import {useState} from 'react';
import _ from 'lodash';

const meta: Meta<typeof CheckboxList> = {
  title: 'CheckboxList',
  component: CheckboxList,
  decorators: [
    (Story: StoryFn) => (
      <div style={{width: '12rem'}}>
        <pre>{'Story='+JSON.stringify(Story)}</pre>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CheckboxList>;

const wrapper = () => {
  
  const [checkedIds, setCheckedIds] = useState();

  const callbackOnChange = (itemId: typeof checkedIds[number]) => {
    setCheckedIds(checkedIds => {
      console.log('call callbackOnChange')
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
    <CheckboxList 
      {...{...props, checkedIds, callbackOnChange}}
    />
  );
}

export const Default: Story = {
  args: {
    title: 'ListTitle',
    options: [
      {id: 1, name: 'Option 1'},
      {id: 2, name: 'Option 2'},
      {id: 3, name: 'Option 3'},
    ],
    checkedIds: [1, 3],
    callbackOnChange: () => {},
    css: CheckboxListCss
  },
  render: (args) => (
    <CheckboxList {...args}/>
  ),
};
