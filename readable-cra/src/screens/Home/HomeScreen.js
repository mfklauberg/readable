// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { FETCH_POSTS, FILTER_POSTS } from '../../sagas/posts';

import { Screen, Post, Filter } from '../../components';

type HomeProps = {
  posts: Array<any>,
  match: Object,
  fetchPosts: Function,
  filterPosts: Function,
};

const Title = styled.h1`
  margin: 0;
  letter-spacing: 3px;
`;

const Content = styled.div``;

const StyledFilter = styled(Filter)`
  color: red;
`;

const StyledPost = styled(Post)`
  margin: 8px;
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

  render() {
    const { posts } = this.props;

    const category = this.getCategory();
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
              <StyledPost
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

const mapStateToProps = ({ posts = [] }) => ({
  posts: [...posts],
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: category => dispatch({ type: FETCH_POSTS, category }),
  filterPosts: filters => dispatch({ type: FILTER_POSTS, filters }),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen));
