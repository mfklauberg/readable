// @flow

import React from 'react';
import styled from 'styled-components';

type ArrowProps = {
  direction: string,
  onClick: Function,
};

const directions = {
  UP: 'rotate(-135deg)',
  LEFT: 'rotate(135deg)',
  DOWN: 'rotate(45deg)',
  RIGHT: 'rotate(-45deg)',
};

const Wrapper = styled.p`
  margin: 0;
`;

const Icon = styled.i`
  padding: 3px;
  cursor: pointer;
  border: solid black;
  display: inline-block;
  border-width: 0 2px 2px 0;

  ${props => `transform: ${directions[props.direction]};`}
`;

const Arrow = ({ direction, onClick }: ArrowProps) => (
  <Wrapper>
    <Icon
      onClick={onClick}
      direction={direction}
    />
  </Wrapper>
);

export default Arrow;
