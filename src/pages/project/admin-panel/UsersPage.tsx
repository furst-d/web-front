import React, {useState} from 'react';
import Button from "../../../components/styles/material-ui/components/Button";
import AddUser from "../../../components/admin-panel/AddUser";
import Dialog from "../../../components/styles/material-ui/components/Dialog";
import UserList from "../../../components/admin-panel/UserList";
import {ControlPanel, ControlPanelWrapper} from "../../../components/styles/content/Content";

const UsersPage = () => {
    const [openRegistrationModal, setOpenRegistrationModal] = useState<boolean>(false);

    return (
        <>
            <ControlPanelWrapper>
                <ControlPanel>
                    <li><Button variant="contained" color="success" onClick={() =>setOpenRegistrationModal(true)}>Přidat uživatele</Button></li>
                </ControlPanel>
                <Dialog open={openRegistrationModal} onClose={() => setOpenRegistrationModal(false)}>
                    <AddUser />
                </Dialog>
            </ControlPanelWrapper>
            <UserList />
        </>
    );
};

export default UsersPage;
