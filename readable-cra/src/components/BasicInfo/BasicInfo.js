// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';

import getColor from '../../utils/votescore';
import getTimeSince from '../../utils/timesince';

type BasicInfoProps = {
  author: string,
  timestamp: number,
  voteScore: number,
};

type PointsProps = {
  voteScore: number,
};

const Text = styled.span`
  font-size: 14px;
`;

const Highlight = styled.span`
  background-color: ${props => props.color};
`;

const Points = ({ voteScore }: PointsProps) => (
  <Highlight color={getColor(voteScore)}>
    <Text>{voteScore} points</Text>
  </Highlight>
);

const BasicInfo = ({ author, timestamp, voteScore }: BasicInfoProps) => (
  <Fragment>
    <Points voteScore={voteScore} />
    <Text> by {author}</Text>
    <Text> {getTimeSince(timestamp)}</Text>
  </Fragment>
);

export default BasicInfo;
