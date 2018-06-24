import { ADD_POSTS, FILTER_POSTS, DELETE_POST, VOTE_POST } from '../sagas/posts';

const addPosts = (state, { posts = [] }) => [
  ...posts.filter(post => !post.deleted),
];

const deletePost = (state, { deleted }) => [
  ...state.filter(post => post.id !== deleted.id),
];

const votePost = (state, { voted }) => {
  const postIndex = [...state].findIndex(post => post.id === voted.id);
  const filtered = [...state.filter(post => post.id !== voted.id)];

  filtered.splice(postIndex, 0, voted);

  return filtered;
};

const filterPosts = (state, { filters = [] }) => {
  const sorted = [...state];

  const sortFn = key => (x, y) => x[key] < y[key];
  filters.forEach(filter => sorted.sort(sortFn(filter)));

  return sorted;
};

export default function posts(state = [], action) {
  const actions = {
    [ADD_POSTS]: addPosts,
    [VOTE_POST]: votePost,
    [DELETE_POST]: deletePost,
    [FILTER_POSTS]: filterPosts,
  };

  const noop = () => state;
  const fn = actions[action.type] || noop;

  return fn(state, action);
}
