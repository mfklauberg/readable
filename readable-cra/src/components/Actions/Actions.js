// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';

type ActionsProps = {
  onEdit: Function,
  onDelete: Function,
};

const Text = styled.span`
  font-size: 14px;
`;

const Link = Text.extend`
  cursor: pointer;
`;

const Actions = ({ onEdit, onDelete }: ActionsProps) => (
  <Fragment>
    <Text>
      {' '}
      | <Link onClick={onEdit}>edit</Link>
    </Text>
    <Text>
      {' '}
      | <Link onClick={onDelete}>delete</Link>
    </Text>
  </Fragment>
);

export default Actions;
