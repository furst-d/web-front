import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import {AvatarProps} from "@mui/material";

const AvatarPreview = styled(Avatar)<AvatarProps>(() => ({
    '&.MuiAvatar-root': {
        width: 60, height: 60,
    },
}));

export default AvatarPreview;
