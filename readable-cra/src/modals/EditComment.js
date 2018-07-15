// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Title } from '../components';
import CommentForm from './CommentForm';
import { FETCH_EDIT_COMMENT, WATCH_TOGGLE_EDIT_COMMENT_MODAL } from '../sagas/comments';

type CommentProps = {
  id: string,
  body: string,
  author: string,
};

type EditCommentProps = {
  onClose: Function,
  saveComment: Function,
  comment: CommentProps,
};

type EditCommentState = {
  comment: CommentProps,
};

class EditComment extends Component<EditCommentProps, EditCommentState> {
  constructor(props) {
    super(props);

    // not entirely sure about this.
    this.state = {
      comment: this.props.comment,
    };
  }

  state = {
    comment: {
      id: '',
      body: '',
      author: '',
    },
  };

  onSave = () => {
    const { comment, saveComment } = this.props;

    const details = { ...comment };
    saveComment(details);
  };

  onTextChange = name => (event) => {
    const { comment } = this.state;

    comment[name] = event.target.value;

    this.setState(prevState => ({ ...prevState, comment }));
  };

  render() {
    const { comment } = this.state;
    const { onClose } = this.props;

    return (
      <Fragment>
        <Title>Edit comment</Title>
        <CommentForm
          onClose={onClose}
          comment={{ ...comment }}
          onSave={this.onSave}
          onTextChange={this.onTextChange}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ comments }) => ({
  comment: { ...comments.comment },
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch({ type: WATCH_TOGGLE_EDIT_COMMENT_MODAL }),
  saveComment: details => dispatch({ type: FETCH_EDIT_COMMENT, details }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditComment);
