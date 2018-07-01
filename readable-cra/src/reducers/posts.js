import {
  ADD_POSTS,
  FILTER_POSTS,
  DELETE_POST,
  VOTE_POST,
  ADD_POST,
} from '../sagas/posts';

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

const initialState = {
  posts: [],
  loading: false,
};

export default function posts(state = initialState, action) {
  const actions = {
    [ADD_POST]: addPost,
    [ADD_POSTS]: addPosts,
    [VOTE_POST]: votePost,
    [DELETE_POST]: deletePost,
    [FILTER_POSTS]: filterPosts,
  };

  const noop = () => state;
  const fn = actions[action.type] || noop;

  return fn(state, action);
}
