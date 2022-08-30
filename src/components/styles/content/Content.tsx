import styled from "styled-components";
import {StyledLink} from "../../navbar/NavItemsSection";

export const Content = styled.div`
  background-color: ${p => p.theme.secondary};
  border-radius: 10px;
  margin: 1em;
  width: 100vw;
  max-width: 70em;
  padding: 20px;
  flex: 1 1 auto;
  
  @media (min-width: 768px) {
    margin: 1.5em;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 100vw;
  margin: 1em;

  @media (min-width: 768px) {
    flex-direction: row;
    margin: 1.5em;
  }
`

export const SubMenu = styled.ul`
  list-style: none;
  width: 100%;

  @media (min-width: 768px) {
    width: 250px;
    padding-left: 10px;
  }
`

export const SubContent = styled.div`
  background-color: ${p => p.theme.secondary};
  flex: 1 1 auto;
  border-radius: 10px;
  padding: 20px;
`

export const SubMenuStyledLink = styled(StyledLink)`
  border-bottom: 1px solid ${p => p.theme.primary};
`

export const ControlPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

export const ControlPanel = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`