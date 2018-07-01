// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { FETCH_POSTS, FILTER_POSTS } from '../../sagas/posts';

import { Screen, Post, Filter, NotFound, Loader } from '../../components';

type HomeProps = {
  match: Object,
  loading: boolean,
  posts: Array<any>,
  fetchPosts: Function,
  filterPosts: Function,
  categories: Array<string>,
};

const Title = styled.h1`
  margin: 0;
  letter-spacing: 3px;
`;

const Content = styled.div``;

const StyledFilter = styled(Filter)`
  color: red;
`;

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
      <Loader color="red" size={32} />
    </Screen>
  );

  renderNotFound = (category: string) => (
    <Screen>
      <NotFound message={`The category "${category}" doesn't exist.`} />
    </Screen>
  );

  render() {
    const { posts, loading } = this.props;

    const category = this.getCategory();

    if (loading) {
      return this.renderLoading();
    }

    if (!this.categoryExists(category)) {
      return this.renderNotFound(category);
    }

    const title = `Showing ${category ? `posts for ${category}` : 'all posts'}`;

    return (
      <Screen>
        <Title>{title}</Title>
        <StyledFilter
          onFilter={this.onFilter}
        />
        <Content>
          {
            posts.map(post => (
              <Post
                post={post}
                key={post.id}
                showCategories={!category}
              />
            ))
          }
        </Content>
      </Screen>
    );
  }
}

const mapStateToProps = ({ posts = {}, categories = [] }) => ({
  loading: posts.loading,
  posts: [...posts.posts],
  categories: [...categories],
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: category => dispatch({ type: FETCH_POSTS, category }),
  filterPosts: filters => dispatch({ type: FILTER_POSTS, filters }),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen));
