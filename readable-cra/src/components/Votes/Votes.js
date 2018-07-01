// @flow

import React from 'react';
import styled from 'styled-components';

import { Arrow } from '..';

const ArrowsWrapper = styled.div`
  display: flex;
  padding-right: 8px;
  flex-direction: column;
  justify-content: center;
`;

type ArrowsProps = {
  onUpvote: Function,
  onDownvote: Function,
};

const Arrows = ({ onUpvote, onDownvote }: ArrowsProps) => (
  <ArrowsWrapper>
    <Arrow direction="UP" onClick={onUpvote} />
    <Arrow direction="DOWN" onClick={onDownvote} />
  </ArrowsWrapper>
);

export default Arrows;
