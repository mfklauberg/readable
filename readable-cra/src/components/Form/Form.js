// @flow

import React from 'react';

type FormProps = {
  children: Array<*>,
};
const Form = ({ children }: FormProps) => <form>{children}</form>;

export default Form;
