import React, {useState} from 'react';
import styled from "styled-components";
import Button from "../../../components/material-ui/components/Button";
import AddUser from "./AddUser";
import Dialog from "../../../components/material-ui/components/Dialog";

const UsersPage = () => {
    const [openRegistrationModal, setOpenRegistrationModal] = useState<boolean>(false);

    return (
        <ControlPanelWrapper>
            <ControlPanel>
                <li><Button variant="contained" color="success" onClick={() =>setOpenRegistrationModal(true)}>Přidat uživatele</Button></li>
            </ControlPanel>
            <Dialog open={openRegistrationModal} onClose={() => setOpenRegistrationModal(false)}>
                <AddUser />
            </Dialog>
        </ControlPanelWrapper>
    );
};

export default UsersPage;

const ControlPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ControlPanel = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`
