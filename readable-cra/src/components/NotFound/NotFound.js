// @flow

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Error = styled.div`
  padding: 8px;
  border-radius: 3px;
  border: 2px solid #ff5454;
`;

const Title = styled.span`
  color: #383838;
  font-size: 22px;
`;

const Body = styled.div`
  margin-top: 4px;
`;

const Message = styled.span`
  font-size: 16px;
`;

const Actions = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: space-evenly;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
`;

type NotFoundProps = {
  message: string,
};

const NotFound = ({ message }: NotFoundProps) => (
  <Error>
    <Title>Content not found!</Title>
    <Body>
      <Message>{message}</Message>
      <Actions>
        <StyledLink to="/">Home</StyledLink>
      </Actions>
    </Body>
  </Error>
);

export default NotFound;
