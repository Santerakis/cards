import { Meta, StoryObj } from '@storybook/react'

import { EditIcon } from '@/assets'
import { EditDeckModal } from '@/components/ui/modal/edit-pack-modal/edit-deck-modal.tsx'

const meta = {
  title: 'Modals/Edit Pack Modal',
  component: EditDeckModal,
  tags: ['autodocs'],
} satisfies Meta<typeof EditDeckModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    setIsOpenEditDeck: () => {},
    cover: '',
    isOpenEditDeck: false,
    packName: 'EditedPackName',
    isPrivate: true,
    trigger: <EditIcon />,
    onSubmit: data => {
      // eslint-disable-next-line no-console
      console.log(data)
    },
  },
}
