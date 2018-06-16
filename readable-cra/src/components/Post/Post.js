import React from 'react';
import styled from 'styled-components';
import { subHours, formatDistanceStrict } from 'date-fns';

type PostProps = {
  id: string, //eslint-disable-line
  title: string,
  author: string,
  category: string,
  timestamp: number,
  voteScore: number,
  commentCount: number,
};

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Actions = styled.div`
  margin: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  cursor: pointer;
  border-bottom: 8px solid black;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
`;

const ArrowDown = ArrowUp.extend`
  transform: rotate(180deg);
`;

const TitleWrapper = styled.div``;

const Title = styled.span`
  color: #000000;
  cursor: pointer;
  font-size: 12pt;
  text-decoration: none;
`;

const Category = styled.span`
  color: #c2c2c2;
  font-size: 10pt;
  margin-left: 8px;
  vertical-align: middle;
`;

const Information = styled.span`
  color: #828282;
  font-size: 10pt;
  vertical-align: middle;
`;

const Body = styled.div``;

const getTimeSince = timestamp =>
  `${formatDistanceStrict(subHours(new Date(timestamp), 0), new Date())} ago`;

const getPrimaryInfo = (voteScore, author, timestamp) =>
  `${voteScore} points by ${author} ${getTimeSince(timestamp)}`;

const getSecondaryInfo = commentCount =>
  `${
    commentCount === 0
      ? 'discuss'
      : `${commentCount} ${commentCount > 1 ? 'comments' : 'comment'} `
  }`;

const getInformation = (voteScore, author, timestamp, commentCount) =>
  `${getPrimaryInfo(voteScore, author, timestamp)} | ${getSecondaryInfo(commentCount)}`;

function Post(props: PostProps) {
  const {
    title, voteScore, category, timestamp, author, commentCount,
  } = props;

  return (
    <PostWrapper>
      <Actions>
        <ArrowUp />
        <ArrowDown />
      </Actions>
      <Body>
        <TitleWrapper>
          <Title>{title}</Title>
          <Category>({category})</Category>
        </TitleWrapper>
        <Information>
          {getInformation(voteScore, author, timestamp, commentCount)}
        </Information>
      </Body>
    </PostWrapper>
  );
}

export default Post;
