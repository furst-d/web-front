import React, { useState } from 'react'
import { ControlPanel, ControlPanelWrapper } from '../../../components/styles/content/Content'
import Button from '../../../components/styles/material-ui/components/Button'
import Dialog from '../../../components/styles/material-ui/components/Dialog'
import AddFriend from '../../../components/profile/AddFriend'
import FriendsList from '../../../components/profile/FriendsList'

const FriendsPage = () => {
  const [openAddFriendModal, setOpenAddFriendModal] = useState<boolean>(false)

  return (
        <>
            <ControlPanelWrapper>
                <ControlPanel>
                    <li><Button variant="contained" color="success" onClick={() => setOpenAddFriendModal(true)}>Přidat přítele</Button></li>
                </ControlPanel>
                <Dialog open={openAddFriendModal} onClose={() => setOpenAddFriendModal(false)}>
                    <AddFriend />
                </Dialog>
            </ControlPanelWrapper>
            <FriendsList />
        </>
  )
}

export default FriendsPage
