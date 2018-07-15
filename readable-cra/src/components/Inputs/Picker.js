// @flow

import React from 'react';
import styled from 'styled-components';

import Label from './Label';
import Wrapper from './Wrapper';

const Select = styled.select`
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
  options: Array<*>,
  onChange: Function,
};

const Picker = ({
  options = [], value = '', label, name, onChange,
}: TextInputProps) => (
  <Wrapper>
    <Label for={name}>{label}</Label>
    <Select autocomplete="off" value={value} name={name} onChange={onChange}>
      <option value="" />
      {
        options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
      }
    </Select>
  </Wrapper>
);

export default Picker;
