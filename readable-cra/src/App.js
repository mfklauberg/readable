// @flow

import React, { Component, Fragment } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { Menu, MenuTitle, MenuItem } from './components';

import { FETCH_CATEGORIES } from './sagas/categories';

import { HomeScreen, PostDetailsScreen } from './screens';

const Readable = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

type AppProps = {
  fetchCategories: Function,
  categories: Array<string>,
};

class App extends Component<AppProps> {
  componentDidMount() {
    const { fetchCategories } = this.props;

    fetchCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <Readable>
        <Menu>
          <MenuTitle size={24} marginBottom={16}>
            <Link to="/">Readable</Link>
          </MenuTitle>

          <MenuTitle size={20} marginBottom={4}>
            Categories
          </MenuTitle>

          {categories.map(category => (
            <MenuItem key={category} to={`/${category}`}>
              {category}
            </MenuItem>
          ))}
        </Menu>
        <Fragment>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/:category" component={HomeScreen} />
          <Route path="/:category/:post" component={PostDetailsScreen} />
        </Fragment>
      </Readable>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: [...categories],
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch({ type: FETCH_CATEGORIES }),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
