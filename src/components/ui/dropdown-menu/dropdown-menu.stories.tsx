import { Meta } from '@storybook/react'

import { AvatarDropdown, DeckEditMenu, DropdownMenu } from '@/components'

const meta = {
  title: 'Components/Dropdown-menu',
  component: DropdownMenu,
  decorators: [
    Story => (
      <div style={{ margin: '3em', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta

export const Avatar_dropdown_menu = {
  render: () => {
    return (
      <AvatarDropdown
        userName={'Valera'}
        userEmail={'valera@gmail.com'}
        onSignOut={() => console.log('onSigOut called')}
      />
    )
  },
}

export const Deck_menu = {
  render: () => {
    return (
      <DeckEditMenu
        onEdit={() => console.log('onEdit called')}
        onDelete={() => console.log('onDelete called')}
      />
    )
  },
}
