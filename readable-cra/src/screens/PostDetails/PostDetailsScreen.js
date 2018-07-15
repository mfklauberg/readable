// @flow

import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { NewComment, EditComment, EditPost } from '../../modals';
import { FETCH_POST, WATCH_TOGGLE_EDIT_POST_MODAL } from '../../sagas/posts';
import { Screen, NotFound, Post, Loader, Comment, Button } from '../../components';
import { FETCH_COMMENTS, WATCH_TOGGLE_ADD_COMMENT_MODAL } from '../../sagas/comments';

const Actions = styled.div`
  margin-left: 8px;
`;

type PostDetailsProps = {
  match: Object,
  categories: Array<string>,

  post: Object,
  loading: boolean,
  getPost: Function,
  comments: Array<Object>,
  getComments: Function,
  showEditPostModal: boolean,
  toggleEditPostModal: Function,
  showEditCommentModal: boolean,
  showAddNewCommentModal: boolean,
  toggleEditCommentModal: Function,
  toggleAddNewCommentModal: Function,

};

type PostDetailsState = {
};

class PostDetailsScreen extends Component<PostDetailsProps, PostDetailsState> {
  componentDidMount() {
    this.fetchPost();
  }

  getURLParams = () => this.props.match.params;

  categoryExists = () => {
    const { categories = [] } = this.props;
    const { category = '' } = this.getURLParams();

    return category && categories.includes(category);
  };

  fetchPost = () => {
    const { getPost, getComments } = this.props;
    const { post: postId } = this.getURLParams();

    getPost(postId);
    getComments(postId);
  };

  fetchComments = () => { };

  renderNotFound = (message = '') => (
    <Screen>
      <NotFound message={message} />
    </Screen>
  );

  renderLoading = () => (
    <Screen>
      <Loader size={64} color="3797F1" />
    </Screen>
  );

  renderPostNotFound = (post = '') =>
    this.renderNotFound(`The post with id "${post}" doesn't exist.`);

  renderCategoryNotFound = (category = '') =>
    this.renderNotFound(`The category "${category}" doesn't exist.`);

  renderEditPostModal = () => {
    const { showEditPostModal, toggleEditPostModal } = this.props;

    return (
      <Modal
        ariaHideApp={false}
        isOpen={showEditPostModal}
        shouldCloseOnOverlayClick
        onRequestClose={toggleEditPostModal}
      >
        <EditPost />
      </Modal>
    );
  };

  renderNewCommentModal = () => {
    const { showAddNewCommentModal, toggleAddNewCommentModal } = this.props;

    return (
      <Modal
        ariaHideApp={false}
        shouldCloseOnOverlayClick
        isOpen={showAddNewCommentModal}
        onRequestClose={toggleAddNewCommentModal}
      >
        <NewComment />
      </Modal>
    );
  };

  renderEditCommentModal = () => {
    const { showEditCommentModal, toggleEditCommentModal } = this.props;

    return (
      <Modal
        ariaHideApp={false}
        shouldCloseOnOverlayClick
        isOpen={showEditCommentModal}
        onRequestClose={toggleEditCommentModal}
      >
        <EditComment />
      </Modal>
    );
  };

  render() {
    const {
      post, comments, loading, toggleAddNewCommentModal,
    } = this.props;

    const { category } = this.getURLParams();

    if (loading) {
      return this.renderLoading();
    }

    if (!this.categoryExists()) {
      return this.renderCategoryNotFound(category);
    }

    return (
      <Screen>
        <Post
          showBody
          post={post}
        />

        <Actions>
          <Button label="Add new comment" onClick={toggleAddNewCommentModal} />
        </Actions>

        {
          comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
            />
          ))
        }

        {this.renderEditPostModal()}
        {this.renderNewCommentModal()}
        {this.renderEditCommentModal()}
      </Screen>
    );
  }
}

const mapStateToProps = (state = {}) => {
  const { posts, comments, categories } = state;
  const { loading, post, showEditPostModal } = posts;
  const { comments: postComments, showEditCommentModal, showAddNewCommentModal } = comments;

  return {
    loading,
    post: { ...post },
    showEditPostModal,
    showEditCommentModal,
    showAddNewCommentModal,
    comments: [...postComments],
    categories: [...categories],
  };
};

const mapDispatchToProps = dispatch => ({
  getPost: postId => dispatch({ type: FETCH_POST, postId }),
  getComments: postId => dispatch({ type: FETCH_COMMENTS, postId }),
  toggleAddNewCommentModal: () => dispatch({ type: WATCH_TOGGLE_ADD_COMMENT_MODAL }),
  toggleEditCommentModal: post => dispatch({ type: WATCH_TOGGLE_EDIT_POST_MODAL, post }),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetailsScreen));
