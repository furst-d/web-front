import React from 'react';
import styled from "styled-components";

interface ErrorFormProp {
    errors: string[];
}

const ErrorForm = ({errors}: ErrorFormProp) => {
    const hasErrors = () => {
        return errors.length > 0;
    }

    return (
        <>
            {hasErrors()
                &&
                <ErrorList>
                    {errors.map((error, index) => {
                        return (
                            <ErrorItem key={index}>{error}</ErrorItem>
                        )
                    })}
                </ErrorList>
            }
        </>
    );
};

export default ErrorForm;


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

