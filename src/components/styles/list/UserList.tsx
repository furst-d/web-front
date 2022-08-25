import styled from "styled-components";

export const UserListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px
`

export const UserTemplateSection = styled.div`
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

export const UserSection = styled.div`
  display: flex;
  gap: 10px;
`

export const UserInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const NameSection = styled.div`
      font-size: 20px;
      display: flex;
      align-items: center;
      gap: 5px
`

export const ButtonSection = styled.div`
      display: flex;
      gap: 8px;
`