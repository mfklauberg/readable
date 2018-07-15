// @flow

import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  label: string,
  onClick: Function,
};

const Wrapper = styled.button`
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 8px;
  border-radius: 3px;
`;

const Button = ({ label, onClick }: ButtonProps) => (
  <Wrapper onClick={onClick} type="button">
    {label}
  </Wrapper>
);

export default Button;
