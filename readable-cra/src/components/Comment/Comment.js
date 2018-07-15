// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { Actions, Votes, BasicInfo } from '..';
import { FETCH_VOTE_COMMENT, FETCH_DELETE_COMMENT, WATCH_TOGGLE_EDIT_COMMENT_MODAL } from '../../sagas/comments';

type CommentProperties = {
  id: string,
  body: string,
  author: string,
  timestamp: number,
  voteScore: number,
};

type CommentProps = {
  comment: CommentProperties,

  voteComment: Function,
  deleteComment: Function,
  toggleEditCommentModal: Function,
};

const CommentWrapper = styled.div`
  margin: 8px;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #C2C2C2;
`;

const CommentHeader = styled.div`
  display: flex;
`;

const CommentBody = styled.div`
  margin-top: 8px;
`;

class Comment extends Component<CommentProps> {
  onEdit = () => {
    const { comment, toggleEditCommentModal } = this.props;

    toggleEditCommentModal(comment);
  }

  onDelete = () => {
    const { comment, deleteComment } = this.props;

    deleteComment(comment.id);
  };

  onUpvote = () => {
    const { comment, voteComment } = this.props;

    voteComment(comment.id, 'upVote');
  };

  onDownvote = () => {
    const { comment, voteComment } = this.props;

    voteComment(comment.id, 'downVote');
  };

  render() {
    const { comment } = this.props;
    const {
      body, author, timestamp, voteScore,
    } = comment;

    return (
      <CommentWrapper>
        <CommentHeader>
          <Votes
            onUpvote={this.onUpvote}
            onDownvote={this.onDownvote}
          />
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
          </div>
        </CommentHeader>
        <CommentBody>
          {body}
        </CommentBody>
      </CommentWrapper>
    );
  }
}

const noop = () => ({});

const mapDispatchToProps = dispatch => ({
  deleteComment: comment => dispatch({ type: FETCH_DELETE_COMMENT, comment }),
  voteComment: (comment, option) => dispatch({ type: FETCH_VOTE_COMMENT, comment, option }),
  toggleEditCommentModal: comment => dispatch({ type: WATCH_TOGGLE_EDIT_COMMENT_MODAL, comment }),
});

export default withRouter(connect(
  noop,
  mapDispatchToProps,
)(Comment));
