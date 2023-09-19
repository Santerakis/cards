import { Meta, StoryObj } from '@storybook/react'

import { DeleteIcon } from '@/assets'
import { DeleteDialog } from '@/components'

const meta = {
  title: 'Modals/Delete Dialog',
  component: DeleteDialog,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: /(?:\b|')(item|trigger|onClick)(?:\b|')/g,
    },
  },
} satisfies Meta<typeof DeleteDialog>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    title: 'Delete Pack',
    buttonTitle: 'Delete Pack',
    children: <DeleteIcon />,
    bodyMessage: 'do you really want to delete?',
    onClick: () => {},
    isOpen: false,
  },
}
