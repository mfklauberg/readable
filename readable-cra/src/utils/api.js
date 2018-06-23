import guid from './guid';

const address = 'http://localhost:3001';

const token = localStorage.token ? localStorage.token : guid();

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

const get = (path: string) => fetch(`${address}${path}`, { headers });

const post = (path: string, params: Object) =>
  fetch(`${address}${path}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...params }),
  });

const put = (path: string, params: Object) =>
  fetch(`${address}${path}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...params }),
  });

const del = (path: string) =>
  fetch(`${address}${path}`, {
    method: 'DELETE',
    headers,
  });

export const getCategories = () =>
  get('/categories')
    .then(res => res.json())
    .then(data => data);

export const getPosts = (category: string) =>
  get(`${category ? `/${category}/posts` : '/posts'}`)
    .then(res => res.json())
    .then(data => data);

type Post = {
  id: string,
  timestamp: number,
  title: string,
  body: string,
  author: string,
  category: string,
};
export const addPost = (post: Post) =>
  post('/posts', post)
    .then(res => res.json())
    .then(data => data);

export const getPost = (post: string) =>
  get(`/post/${post}`)
    .then(res => res.json())
    .then(data => data);

export const votePost = (post: string, option: string) =>
  post(`/posts/${post}`, { option })
    .then(res => res.json())
    .then(data => data);

type PostDetails = {
  title: string,
  body: string,
};
export const editPost = (post: string, details: PostDetails) =>
  put(`/posts/${post}`, details)
    .then(res => res.json())
    .then(data => data);

export const deletePost = (post: string) =>
  del(`/posts/${post}`)
    .then(res => res.json())
    .then(data => data);

export const getComments = (post: string) =>
  fetch(`/posts/${post}/comments`)
    .then(res => res.json())
    .then(data => data);

type Comment = {
  id: string,
  timestamp: number,
  body: string,
  author: string,
  parentId: string,
};
export const addComment = (post: string, comment: Comment) =>
  post('/comments', comment)
    .then(res => res.json())
    .then(data => data);

export const getComment = (comment: string) =>
  get(`/comments/${comment}`)
    .then(res => res.json())
    .then(data => data);

export const voteComment = (comment: string, option: string) =>
  post(`/comments/${comment}`, { option })
    .then(res => res.json())
    .then(data => data);

type CommentDetails = {
  timestamp: number,
  body: string,
};
export const editComment = (comment: string, details: CommentDetails) =>
  put(`/comments/${comment}`, details)
    .then(res => res.json())
    .then(data => data);

export const deleteComment = (comment: string) =>
  del(`/comments/${comment}`)
    .then(res => res.json())
    .then(data => data);
