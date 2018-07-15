// @flow

import React from 'react';

import { Button, Form, Picker, TextInput, TextArea } from '../components';

type PostProps = {
  body: string,
  title: string,
  author: string,
  category: string,
};

type PostFormProperties = {
  post: PostProps,
  onSave: Function,
  onClose: Function,
  onTextChange: Function,
  categories: Array<string>,
};

const PostForm = ({
  categories,
  onClose,
  onSave,
  onTextChange,
  post,
}: PostFormProperties) => {
  const {
    title, author, category, body,
  } = post;

  return (
    <Form>
      <TextInput
        name="title"
        label="Title"
        value={title}
        onChange={onTextChange('title')}
      />

      <TextInput
        name="author"
        label="Author"
        value={author}
        onChange={onTextChange('author')}
      />

      <Picker
        name="category"
        label="Category"
        value={category}
        options={categories}
        onChange={onTextChange('category')}
      />

      <TextArea
        name="body"
        label="Body"
        value={body}
        onChange={onTextChange('body')}
      />

      <Button label="Save" onClick={onSave} />
      <Button label="Cancel" onClick={onClose} />
    </Form>
  );
};

export default PostForm;
