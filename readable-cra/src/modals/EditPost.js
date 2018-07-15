// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import PostForm from './PostForm';
import { Title } from '../components';
import { FETCH_EDIT_POST, WATCH_TOGGLE_EDIT_POST_MODAL } from '../sagas/posts';

type PostProps = {
  id: string,
  body: string,
  title: string,
  author: string,
  category: string,
};

type EditPostProps = {
  post: PostProps,
  onClose: Function,
  savePost: Function,
  categories: Array<string>,
};

type NewPostState = {
  post: PostProps,
};

class EditPost extends Component<EditPostProps, NewPostState> {
  constructor(props) {
    super(props);

    // not entirely sure about this.
    this.state = {
      post: this.props.post,
    };
  }

  state = {
    post: {
      id: '',
      body: '',
      title: '',
      author: '',
      category: '',
    },
  };

  onSave = () => {
    const { post, savePost } = this.props;

    const details = { ...post };
    savePost(post.id, details);
  };

  onTextChange = name => (event) => {
    const { post } = this.state;

    post[name] = event.target.value;

    this.setState(prevState => ({ ...prevState, post }));
  };

  render() {
    const { post } = this.state;
    const { categories, onClose } = this.props;

    return (
      <Fragment>
        <Title>Edit post</Title>
        <PostForm
          onClose={onClose}
          post={{ ...post }}
          onSave={this.onSave}
          categories={categories}
          onTextChange={this.onTextChange}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ categories = [], posts }) => ({
  post: { ...posts.post },
  categories: [...categories],
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch({ type: WATCH_TOGGLE_EDIT_POST_MODAL }),
  savePost: (post, details) => dispatch({ type: FETCH_EDIT_POST, post, details }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPost);
