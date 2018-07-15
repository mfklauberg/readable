// @flow

import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { FETCH_POSTS, FILTER_POSTS, WATCH_TOGGLE_ADD_POST_MODAL, WATCH_TOGGLE_EDIT_POST_MODAL } from '../../sagas/posts';

import { Screen, Post, Filter, NotFound, Loader, Title, Button } from '../../components';

import { NewPost, EditPost } from '../../modals';

const Actions = styled.div`
  margin: 8px;
`;

type HomeProps = {
  match: Object,
  loading: boolean,
  posts: Array<any>,
  fetchPosts: Function,
  filterPosts: Function,
  categories: Array<string>,
  showNewPostModal: boolean,
  showEditPostModal: boolean,
  toggleAddPostModal: Function,
  toggleEditPostModal: Function,
};

class HomeScreen extends Component<HomeProps> {
  componentDidMount() {
    const { fetchPosts } = this.props;

    fetchPosts(this.getCategory());
  }

  componentDidUpdate(prevProps) {
    const { match, fetchPosts } = this.props;
    const { match: previousMatch } = prevProps;

    if (match.params.category !== previousMatch.params.category) {
      fetchPosts(this.getCategory());
    }
  }

  onFilter = (filters) => {
    const { filterPosts } = this.props;

    filterPosts(filters);
  };

  getCategory = () => {
    const { match } = this.props;

    return match.params.category;
  };

  categoryExists = (category: string) => {
    const { categories } = this.props;

    return category && categories.includes(category);
  };

  renderLoading = () => (
    <Screen>
      <Loader size={32} />
    </Screen>
  );

  renderNotFound = (category: string) => (
    <Screen>
      <NotFound message={`The category "${category}" doesn't exist.`} />
    </Screen>
  );

  renderNewPostModal = () => {
    const { showNewPostModal, toggleAddPostModal } = this.props;

    return (
      <Modal
        ariaHideApp={false}
        isOpen={showNewPostModal}
        onRequestClose={toggleAddPostModal}
        shouldCloseOnOverlayClick
      >
        <NewPost />
      </Modal>
    );
  };

  renderEditPostModal = () => {
    const { showEditPostModal, toggleEditPostModal } = this.props;

    return (
      <Modal
        ariaHideApp={false}
        isOpen={showEditPostModal}
        onRequestClose={toggleEditPostModal}
        shouldCloseOnOverlayClick
      >
        <EditPost />
      </Modal>
    );
  };

  render() {
    const { toggleAddPostModal, posts, loading } = this.props;

    const category = this.getCategory();

    if (loading) {
      return this.renderLoading();
    }

    if (category && !this.categoryExists(category)) {
      return this.renderNotFound(category);
    }

    const title = `Showing ${category ? `posts for ${category}` : 'all posts'}`;

    return (
      <Screen>
        <Title>{title}</Title>
        <Filter
          onFilter={this.onFilter}
        />

        <Actions>
          <Button label="Add new post" onClick={toggleAddPostModal} />
        </Actions>
        <div>
          {
            posts
              .filter(post => (category ? (post.category === category) : true))
              .map(post => (
                <Post
                  post={post}
                  key={post.id}
                  showCategories={!category}
                />
            ))
          }
        </div>

        {this.renderNewPostModal()}
        {this.renderEditPostModal()}
      </Screen>
    );
  }
}

const mapStateToProps = ({ posts = {}, categories = [] }) => ({
  loading: posts.loading,
  posts: [...posts.posts],
  categories: [...categories],
  showNewPostModal: posts.showNewPostModal,
  showEditPostModal: posts.showEditPostModal,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: category => dispatch({ type: FETCH_POSTS, category }),
  filterPosts: filters => dispatch({ type: FILTER_POSTS, filters }),
  toggleAddPostModal: () => dispatch({ type: WATCH_TOGGLE_ADD_POST_MODAL }),
  toggleEditPostModal: post => dispatch({ type: WATCH_TOGGLE_EDIT_POST_MODAL, post }),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen));
