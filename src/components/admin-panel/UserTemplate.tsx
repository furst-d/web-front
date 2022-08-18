import React, {useState} from 'react';
import {UserProp} from "./UserList";
import styled from "styled-components";
import Button from "../styles/material-ui/components/Button";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AddUser from "./AddUser";
import Dialog from "../styles/material-ui/components/Dialog";

interface UserTemplateProp {
    data: UserProp
}

const UserTemplate = ({data}: UserTemplateProp) => {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openResetModal, setOpenResetModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    return (
        <UserTemplateSection>
            <NameSection>
                {data.first_name} {data.last_name}
                <VerifiedUserIcon color={data.activated === 1 ? "success" : "error"} />
            </NameSection>
            <ButtonSection>
                <Button size="small" variant="contained" color="info" onClick={() => setOpenEditModal(true)}>Upravit</Button>
                <Button size="small" variant="contained" color="warning" onClick={() => setOpenResetModal(true)}>Resetovat</Button>
                <Button size="small" variant="contained" color="error" onClick={() => setOpenDeleteModal(true)}>Smazat</Button>
            </ButtonSection>
            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <AddUser />
            </Dialog>
            <Dialog open={openResetModal} onClose={() => setOpenResetModal(false)}>
                <AddUser />
            </Dialog>
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <AddUser />
            </Dialog>
        </UserTemplateSection>
    );
};

export default UserTemplate;

const UserTemplateSection = styled.div`
      border: 1px solid ${p => p.theme.bg};
      border-radius: 5px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    `

const NameSection = styled.div`
      font-size: 20px;
      display: flex;
      align-items: center;
      gap: 5px
    `

const ButtonSection = styled.div`
      display: flex;
      gap: 8px;
    `
