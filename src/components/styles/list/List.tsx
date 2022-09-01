import styled from "styled-components";

export const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px
`

export const ListTemplateSection = styled.div`
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
