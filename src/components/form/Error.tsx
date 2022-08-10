import styled from "styled-components";

export const ErrorList = styled.ul`
  list-style-position: inside;
  color: red;
`

export const ErrorItem = styled.li`
  font-size: 16px;
  text-indent: -22px;
  margin-left: 22px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`