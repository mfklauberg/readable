import {
  ADD_POST,
  ADD_POSTS,
  EDIT_POST,
  VOTE_POST,
  DELETE_POST,
  ADD_NEW_POST,
  FILTER_POSTS,
  TOGGLE_ADD_POST_MODAL,
  TOGGLE_EDIT_POST_MODAL,
} from '../sagas/posts';

import { UPDATE_COMMENT_COUNT } from '../sagas/comments';

const addPost = (state, { post = {}, loading = false }) => ({
  ...state,
  post,
  loading,
});

const addPosts = (state, { posts = [], loading = false }) => ({
  ...state,
  loading,
  posts: [...posts.filter(post => !post.deleted)],
});

const deletePost = (state, { deleted }) => ({
  ...state,
  posts: [...state.posts.filter(post => post.id !== deleted.id)],
  post: deleted,
});

const votePost = (state, { voted }) => {
  const { posts, post } = state;

  const postIndex = [...posts].findIndex(post => post.id === voted.id);
  const filtered = [...posts.filter(post => post.id !== voted.id)];

  filtered.splice(postIndex, 0, voted);

  const newPost = post && post.id === voted.id ? voted : post;

  return {
    ...state,
    post: newPost,
    posts: [...filtered],
  };
};

const filterPosts = (state, { filters = [] }) => {
  const sorted = [...state.posts];

  const sortFn = key => (x, y) => x[key] < y[key];
  filters.forEach(filter => sorted.sort(sortFn(filter)));

  return {
    ...state,
    posts: [...sorted],
  };
};

const toggleModal = modal => (state, { post = {} }) => {
  const newState = {
    ...state,
    [modal]: !state[modal],
  };

  if (post.post) {
    newState.post = post.post;
  }

  return newState;
};

const editPost = (state, { edited }) => {
  const { posts } = state;

  const postIndex = [...posts].findIndex(p => p.id === edited.id);
  const filtered = [...posts].filter(p => p.id !== edited.id);

  const newPost = {
    ...[...posts][postIndex],
    ...edited,
  };

  filtered.splice(postIndex, 0, { ...newPost });

  return {
    ...state,
    post: newPost,
    posts: [...filtered],
    showEditPostModal: false,
  };
};

const addNewPost = (state, { added }) => {
  const { posts } = state;

  return {
    ...state,
    posts: [...posts, added],
    showNewPostModal: false,
  };
};

const updateCommentCount = (state, { postId, value }) => {
  const { posts, post } = state;

  if (post && post.id === postId) {
    const commentCount = post.commentCount + value;

    const updatedPost = {
      ...post,
      commentCount,
    };

    return {
      ...state,
      post: updatedPost,
    };
  }

  const postIndex = [...posts].findIndex(p => p.id === postId);
  const postToUpdate = [...posts][postIndex];

  const updatedPost = {
    ...postToUpdate,
    commentCount: postToUpdate.commentCount + value,
  };

  const filtered = [...posts].filter(p => p.id !== postId);
  filtered.splice(postIndex, 0, { ...updatedPost });

  return {
    ...state,
    posts: [...filtered],
  };
};

const initialState = {
  posts: [],
  loading: false,
  showNewPostModal: false,
  showEditPostModal: false,
};

export default function posts(state = initialState, action) {
  const actions = {
    [ADD_POST]: addPost,
    [ADD_POSTS]: addPosts,
    [EDIT_POST]: editPost,
    [VOTE_POST]: votePost,
    [DELETE_POST]: deletePost,
    [ADD_NEW_POST]: addNewPost,
    [FILTER_POSTS]: filterPosts,
    [UPDATE_COMMENT_COUNT]: updateCommentCount,
    [TOGGLE_ADD_POST_MODAL]: toggleModal('showNewPostModal'),
    [TOGGLE_EDIT_POST_MODAL]: toggleModal('showEditPostModal'),
  };

  const noop = () => state;
  const fn = actions[action.type] || noop;

  return fn(state, action);
}
