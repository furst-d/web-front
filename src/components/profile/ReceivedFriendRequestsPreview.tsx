import React, {useState} from 'react';
import Button from "../styles/material-ui/components/Button";
import Dialog from "../styles/material-ui/components/Dialog";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {toast} from "react-toastify";
import AvatarPreview from "../styles/material-ui/components/AvatarPreview";
import {FriendProp} from "./FriendsList";

import {
    ButtonSection,
    NameSection,
    UserInfoSection,
    UserSection,
    UserTemplateSection
} from "../styles/list/UserList";

interface FriendTemplateProp {
    data: FriendProp
}

const ReceivedFriendRequestsPreview = ({data}: FriendTemplateProp) => {
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();

    const handleError = (error: any) => {
        if(error.response) {
            if(error.response.status === 404) {
                toast.error("Chybný identifikátor požadavku");
            } else {
                toast.error("Při zpracování požadavku došlo k chybě");
            }
        }
    }

    const acceptRequest = () => {
        axiosPrivate.put(`/api/users/friend-requests/${data.requestId}/accept`)
            .then(() => {
                localStorage.setItem("toast", "Žádost byla přijata");
                window.location.reload();
            }).catch((error) => {
            handleError(error);
        });
    }

    const rejectRequest = () => {
        axiosPrivate.put(`/api/users/friend-requests/${data.requestId}/reject`)
            .then(() => {
                localStorage.setItem("toast", "Žádost byla odmítnuta");
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
                        {data.name} {data.lastName}
                    </NameSection>
                    <div>{data.email}</div>
                </UserInfoSection>

            </UserSection>
            <ButtonSection>
                <Button size="small" variant="contained" color="success" onClick={acceptRequest}>Přijmout</Button>
                <Button size="small" variant="contained" color="error" onClick={() => setOpenDeleteModal(true)}>Odmítnout</Button>
            </ButtonSection>
            <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <ConfirmationDialog content={`Opravdu si přejete odmítnout žádost o přátelství od uživatele ${data.name} ${data.lastName}?`} onAccept={rejectRequest} onClose={() => setOpenDeleteModal(false)} />
            </Dialog>
        </UserTemplateSection>
    );
};

export default ReceivedFriendRequestsPreview;

