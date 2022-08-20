import React, {useState} from 'react';
import {UserProp} from "./UserList";
import styled from "styled-components";
import Button from "../styles/material-ui/components/Button";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Dialog from "../styles/material-ui/components/Dialog";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import EditUser from "./EditUser";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import {Tooltip} from "@mui/material";
import AvatarPreview from "../styles/material-ui/components/AvatarPreview";

interface UserTemplateProp {
    data: UserProp
}

const UserTemplate = ({data}: UserTemplateProp) => {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openResetModal, setOpenResetModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();

    const handleError = (error: any) => {
        if(error.response) {
            toast.error("Při zpracování požadavku došlo k chybě");
        }
    }

    const resetAccount = () => {
        axiosPrivate.put(`/api/users/${data.user_id}/reset`)
            .then(() => {
            localStorage.setItem("toast", "Účet uživatele byl resetován");
            window.location.reload();
        }).catch((error) => {
            handleError(error);
        });
    }

    const deleteAccount = () => {
        axiosPrivate.delete(`/api/users/${data.user_id}`)
            .then(() => {
                localStorage.setItem("toast", "Účet byl smazán");
                window.location.reload();
            }).catch((error) => {
            handleError(error);
        });
    }

    return (
        <UserTemplateSection>
            <UserSection>
                {data.avatar
                    ?
                    <AvatarPreview src={process.env.REACT_APP_BASE_URL + "/images/" + data.avatar} />
                    :
                    <AvatarPreview />
                }
                <UserInfoSection>
                    <NameSection>
                        {data.first_name} {data.last_name}
                        <Tooltip title={data.activated === 1 ? "Uživatel je aktivován" : "Uživatel není aktivován"} placement="top-start" >
                            <VerifiedUserIcon color={data.activated === 1 ? "success" : "error"} />
                        </Tooltip>
                    </NameSection>
                    <div>{data.email}</div>
                </UserInfoSection>

            </UserSection>
            <ButtonSection>
                <Button size="small" variant="contained" color="info" onClick={() => setOpenEditModal(true)}>Upravit</Button>
                <Button size="small" variant="contained" color="warning" onClick={() => setOpenResetModal(true)}>Resetovat</Button>
                <Button size="small" variant="contained" color="error" onClick={() => setOpenDeleteModal(true)}>Smazat</Button>
            </ButtonSection>
            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <EditUser user={data} />
            </Dialog>
            <Dialog open={openResetModal} onClose={() => setOpenResetModal(false)}>
                <ConfirmationDialog content={`Opravdu si přejete resetovat účet uživateli ${data.first_name} ${data.last_name}?`} onAccept={resetAccount} onClose={() => setOpenResetModal(false)} />
            </Dialog>
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <ConfirmationDialog content={`Opravdu si přejete smazat účet uživateli ${data.first_name} ${data.last_name}?`} onAccept={deleteAccount} onClose={() => setOpenDeleteModal(false)} />
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

const UserSection = styled.div`
  display: flex;
  gap: 10px;
`

const UserInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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