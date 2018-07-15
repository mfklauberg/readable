// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { Votes, Actions, BasicInfo } from '..';
import { FETCH_DELETE_POST, FETCH_VOTE_POST, WATCH_TOGGLE_EDIT_POST_MODAL } from '../../sagas/posts';

type PostProperties = {
  id: string,
  body: string,
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
  showBody: boolean,
  showCategories: boolean,

  votePost: Function,
  deletePost: Function,
  toggleEditPostModal: Function,
};

const PostWrapper = styled.div`
  margin: 8px;
`;

const PostHeader = styled.div`
  display: flex;
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

const Tag = Text.extend`
  padding: 3px;
  margin-top: 4px
  border-radius: 3px;
  display: inline-block;
  border: 1.25px solid #C2C2C2;
`;

const PostBody = styled.div`
  padding: 8px;
  margin-top: 8px;
  min-height: 70px;
  border-radius: 3px;
  border: 1px solid black;
`;

const getCommentInfo = commentCount =>
  (commentCount === 0 // eslint-disable-line no-nested-ternary
    ? 'discuss'
    : commentCount === 1
      ? '1 comment'
      : `${commentCount} comments`);

class Post extends Component<PostProps> {
  onEdit = () => {
    const { post, toggleEditPostModal } = this.props;

    toggleEditPostModal(post);
  };

  onClick = () => {
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
    const { post, showCategories, showBody } = this.props;

    const {
      title,
      voteScore,
      author,
      timestamp,
      commentCount,
      category,
      body,
    } = post;

    return (
      <PostWrapper>
        <PostHeader>
          <Votes
            onUpvote={() => this.onUpvote()}
            onDownvote={() => this.onDownvote()}
          />
          <div>
            <Title onClick={this.onClick}>{title}</Title>
            <div>
              <BasicInfo
                author={author}
                timestamp={timestamp}
                voteScore={voteScore}
              />
              <Actions
                onEdit={this.onEdit}
                onDelete={this.onDelete}
              />
              <Text> | </Text>
              <Link onClick={this.onClick}>{getCommentInfo(commentCount)}</Link>
            </div>
            {showCategories && (
              <div>
                <Tag>{category}</Tag>
              </div>
            )}
          </div>
        </PostHeader>
        {showBody && <PostBody>{body}</PostBody>}
      </PostWrapper>
    );
  }
}

const noop = () => ({});

const mapDispatchToProps = dispatch => ({
  deletePost: post => dispatch({ type: FETCH_DELETE_POST, post }),
  votePost: (post, option) => dispatch({ type: FETCH_VOTE_POST, post, option }),
  toggleEditPostModal: post => dispatch({ type: WATCH_TOGGLE_EDIT_POST_MODAL, post }),
});

export default withRouter(connect(
  noop,
  mapDispatchToProps,
)(Post));
