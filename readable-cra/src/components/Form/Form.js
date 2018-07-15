// @flow

import React from 'react';

type FormProps = {
  children: Array<*>,
  onSubmit: Function,
};
const Form = ({ onSubmit, children }: FormProps) => (
  <form onSubmit={onSubmit}>{children}</form>
);

export default Form;
