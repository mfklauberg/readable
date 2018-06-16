// @flow

import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(359deg); }
`;

const Container = styled.div``;

const Circle = styled.div`
  width: 100%;
  margin: auto;
  height: 100%;
  border: 4px solid;
  border-color: #9e9e9e;
  border-radius: 100%;
  border-top-color: #${props => props.color};
  animation: ${rotate} 0.8s linear infinite;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

type LoaderProps = {
  size: number,
  color: string,
};

function Loader({ size = 32, color = '3797F1' }: LoaderProps) {
  return (
    <Container>
      <Circle size={size} color={color} />
    </Container>
  );
}

export default Loader;
