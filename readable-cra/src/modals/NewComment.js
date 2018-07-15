// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import { Title } from '../components';
import { FETCH_ADD_COMMENT, WATCH_TOGGLE_ADD_COMMENT_MODAL } from '../sagas/comments';

type NewCommentProps = {
  post: Object,
  onClose: Function,
  addComment: Function,
};

type CommentProps = {
  body: string,
  author: string,
};

type NewCommentState = {
  comment: CommentProps,
};

class NewComment extends Component<NewCommentProps, NewCommentState> {
  state = {
    comment: {
      body: '',
      author: '',
    },
  };

  onSave = () => {
    const { comment } = this.state;
    const { post, addComment } = this.props;

    addComment(post, comment);
  };

  onTextChange = name => (event) => {
    const { comment } = this.state;

    comment[name] = event.target.value;

    this.setState({ comment });
  };

  render() {
    const { comment } = this.state;
    const { onClose } = this.props;

    return (
      <Fragment>
        <Title>New comment</Title>
        <CommentForm
          onClose={onClose}
          onSave={this.onSave}
          comment={{ ...comment }}
          onTextChange={this.onTextChange}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  post: { ...posts.post },
});

const mapDispatchToProps = dispatch => ({
  addComment: (post, comment) => dispatch({ type: FETCH_ADD_COMMENT, comment, post }),
  onClose: () => dispatch({ type: WATCH_TOGGLE_ADD_COMMENT_MODAL }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewComment);
