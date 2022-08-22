import styled from 'styled-components'

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

export const StartFormWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`

export const Form = styled.div`
  font-family: 'Open Sans', sans-serif;
  background-color: ${p => p.theme.secondary};
  color: ${p => p.theme.text};
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

export const LeftForm = styled.div`
  background-color: ${p => p.theme.secondary};
  color: ${p => p.theme.text};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 10px;
  flex: 1;
  font-size: 20px;
  align-items: flex-start;

  @media (min-width: 768px) {
    flex: none;
    gap: 20px;
    padding: 35px;
  }
`
