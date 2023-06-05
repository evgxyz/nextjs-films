
import type {Meta, StoryObj, StoryFn} from '@storybook/react';

import {CheckboxList, CheckboxListCss} from '.';

const meta: Meta<typeof CheckboxList> = {
  title: 'CheckboxList',
  component: CheckboxList,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div style={{width: '12rem'}}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CheckboxList>;

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
    css: CheckboxListCss,
  },
};
