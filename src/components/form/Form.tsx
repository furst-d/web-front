import styled from "styled-components";

export const CenterFormWrap = styled.div`
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  @media (min-width: 768px) {
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`

export const Form = styled.div`
  background-color: ${p => p.theme.secondary};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 10px;
  flex: 1;
  font-size: 20px;

  @media (min-width: 768px) {
    flex: none;
    gap: 20px;
    padding: 35px;
  }
`