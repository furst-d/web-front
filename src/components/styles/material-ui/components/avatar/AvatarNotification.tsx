import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import {AvatarProps} from "@mui/material";

const AvatarNotification = styled(Avatar)<AvatarProps>(() => ({
    '&.MuiAvatar-root': {
        width: 50, height: 50,
    },
}));

export default AvatarNotification;
