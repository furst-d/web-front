import styled from "styled-components";

const NavItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 12px;
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.primary};
  }
`

export default NavItemsWrapper;