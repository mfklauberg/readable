// @flow

import React from 'react';
import styled from 'styled-components';

import Label from './Label';
import Wrapper from './Wrapper';

const Input = styled.input`
  padding: 3px;

  font-size: 16px;
  margin-top: 3px;
  border-radius: 3px;
  border: 1px solid grey;

  &:focus {
    border-color: black;
  }
`;

type TextInputProps = {
  name: string,
  label: string,
  value: string,
  onChange: Function,
};

const TextInput = ({
  value = '', label, name, onChange,
}: TextInputProps) => (
  <Wrapper>
    <Label for={name}>{label}</Label>
    <Input autocomplete="off" name={name} value={value} onChange={onChange} />
  </Wrapper>
);

export default TextInput;
