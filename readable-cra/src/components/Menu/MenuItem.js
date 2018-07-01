// @flow

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Item = styled(NavLink)`
  padding: 4px;
  font-size: 18px;
  margin-left: 8px;
  text-decoration: none;

  &:active, &:visited {
    color: black;
  }
`;

export default Item;
