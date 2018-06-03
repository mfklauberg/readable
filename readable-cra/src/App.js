// @flow

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { Category, Post } from './screens';

const Readable = styled.div``;

export default function App() {
  return (
    <Readable>
      <Route exact path="/" component={Category} />
      <Route exact path="/:category" component={Category} />
      <Route exact path="/:category/:post" component={Post} />
    </Readable>
  );
}
