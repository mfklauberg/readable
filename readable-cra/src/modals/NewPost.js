// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import PostForm from './PostForm';
import { Title } from '../components';
import { FETCH_ADD_NEW_POST, WATCH_TOGGLE_ADD_POST_MODAL } from '../sagas/posts';

type NewPostProps = {
  addPost: Function,
  onClose: Function,
  categories: Array<string>,
};

type PostProps = {
  body: string,
  title: string,
  author: string,
  category: string,
};

type NewPostState = {
  post: PostProps,
};

class NewPost extends Component<NewPostProps, NewPostState> {
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
    const { post } = this.state;
    const { addPost } = this.props;

    addPost(post);
  };

  onTextChange = name => (event) => {
    const { post } = this.state;

    post[name] = event.target.value;

    this.setState({ post });
  };

  render() {
    const { post } = this.state;
    const { categories, onClose } = this.props;

    return (
      <Fragment>
        <Title>New post</Title>
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

const mapStateToProps = ({ categories = [] }) => ({
  categories: [...categories],
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch({ type: FETCH_ADD_NEW_POST, post }),
  onClose: () => dispatch({ type: WATCH_TOGGLE_ADD_POST_MODAL }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPost);
