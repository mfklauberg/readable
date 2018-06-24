// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { subHours, formatDistanceStrict } from 'date-fns';

import { FETCH_DELETE_POST, FETCH_VOTE_POST } from '../../sagas/posts';

import Arrow from '../Arrow/Arrow';

type PostProperties = {
  id: string,
  title: string,
  author: string,
  category: string,
  timestamp: number,
  voteScore: number,
  commentCount: number,
};

type PostProps = {
  history: Object,
  post: PostProperties,
  showCategories: boolean,

  votePost: Function,
  deletePost: Function,
};

const PostWrapper = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: row;
`;

const Title = styled.span`
  font-size: 18px;
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Link = Text.extend`
  cursor: pointer;
`;

const Highlight = styled.span`
  background-color: ${props => props.color};
`;

const Tag = Text.extend`
  padding: 3px;
  margin-top: 4px
  border-radius: 3px;
  display: inline-block;
  border: 1.25px solid #C2C2C2;
`;

const getTimeSince = timestamp =>
  `${formatDistanceStrict(subHours(new Date(timestamp), 0), new Date())} ago`;

const getCommentInfo = commentCount =>
  (commentCount === 0 // eslint-disable-line no-nested-ternary
    ? 'discuss'
    : commentCount === 1
      ? '1 comment'
      : `${commentCount} comments`);

const getColor = voteScore =>
  (voteScore === 0 // eslint-disable-line no-nested-ternary
    ? 'transparent'
    : voteScore > 0
      ? '#D9EAD3'
      : '#F4CCCC');

type PointsProps = {
  voteScore: number,
};

const Points = ({ voteScore }: PointsProps) => (
  <Highlight color={getColor(voteScore)}>
    <Text>{voteScore} points</Text>
  </Highlight>
);

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

class Post extends Component<PostProps> {
  onEdit = () => {
    const { post, history } = this.props;
    const { id, category } = post;

    history.push(`/${category}/${id}`);
  };

  onDelete = () => {
    const { post, deletePost } = this.props;

    deletePost(post.id);
  };

  onUpvote = () => {
    const { post, votePost } = this.props;

    votePost(post.id, 'upVote');
  };

  onDownvote = () => {
    const { post, votePost } = this.props;

    votePost(post.id, 'downVote');
  };

  render() {
    const { post, showCategories } = this.props;

    const {
      title, voteScore, author, timestamp, commentCount, category,
    } = post;

    return (
      <PostWrapper>
        <Arrows onUpvote={() => this.onUpvote()} onDownvote={() => this.onDownvote()} />
        <div>
          <Title>{title}</Title>
          <div>
            <Points voteScore={voteScore} />
            <Text> by {author}</Text>
            <Text> {getTimeSince(timestamp)}</Text>
            <Text>
              {' '}
              | <Link onClick={this.onEdit}>edit</Link>
            </Text>
            <Text>
              {' '}
              | <Link onClick={this.onDelete}>delete</Link> |{' '}
            </Text>
            <Link>{getCommentInfo(commentCount)}</Link>
          </div>
          {showCategories && (
            <div>
              <Tag>{category}</Tag>
            </div>
          )}
        </div>
      </PostWrapper>
    );
  }
}

const noop = () => ({});

const mapDispatchToProps = dispatch => ({
  deletePost: post => dispatch({ type: FETCH_DELETE_POST, post }),
  votePost: (post, option) => dispatch({ type: FETCH_VOTE_POST, post, option }),
});

export default withRouter(connect(
  noop,
  mapDispatchToProps,
)(Post));
