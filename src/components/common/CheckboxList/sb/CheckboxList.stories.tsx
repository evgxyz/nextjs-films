
import type {Meta, StoryObj, StoryFn} from '@storybook/react';

import {CheckboxList, CheckboxListCss} from '.';
import {useState} from 'react';
import _ from 'lodash';

const meta: Meta<typeof CheckboxList> = {
  title: 'CheckboxList',
  component: CheckboxList,
  /* decorators: [
    (Story: StoryFn) => (
      <div style={{display: 'inline-block'}}>
        <Story />
      </div>
    ),
  ], */
};

export default meta;

type Story = StoryObj<typeof CheckboxList>;

const CheckboxListWrapped = (props: React.ComponentProps<typeof CheckboxList>) => {
  
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
    <>
      <div style={{marginBottom: '10px'}}>
        {'checkedIds: ' + JSON.stringify(checkedIds)}
      </div>
      <div style={{display: 'inline-block'}}>
        <CheckboxList 
          {...props}
          checkedIds={checkedIds}
          onChange={callbackOnChange}
        />
      </div>
    </>
  );
}

export const Default: Story = {
  args: {
    title: 'ListTitle',
    options: [
      {id: 1, name: 'Option 1'},
      {id: 2, name: 'Option 2'},
      {id: 3, name: 'Option 3'},
      {id: 4, name: 'Option 4'},
      {id: 5, name: 'Option 5'},
    ],
    checkedIds: [1, 3],
    onChange: () => {},
    css: CheckboxListCss
  },
  render: (args) => (
    <CheckboxListWrapped {...args} />
  )
};
