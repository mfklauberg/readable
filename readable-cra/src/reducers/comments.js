import { ADD_COMMENTS, VOTE_COMMENT, DELETE_COMMENT } from '../sagas/comments';

const addComments = (state, { comments }) => ({
  ...state,
  comments: [...comments],
});

const voteComment = (state, { voted }) => {
  const { comments } = state;

  const postIndex = [...comments].findIndex(comment => comment.id === voted.id);
  const filtered = [...comments.filter(comment => comment.id !== voted.id)];

  filtered.splice(postIndex, 0, voted);

  return {
    ...state,
    comments: [...filtered],
  };
};

const deleteComment = (state, { deleted }) => ({
  ...state,
  comments: [...state.comments.filter(comment => comment.id !== deleted.id)],
});

const initialState = {
  comments: [],
};

export default function comments(state = initialState, action) {
  const actions = {
    [ADD_COMMENTS]: addComments,
    [VOTE_COMMENT]: voteComment,
    [DELETE_COMMENT]: deleteComment,
  };

  const noop = () => state;
  const fn = actions[action.type] || noop;

  return fn(state, action);
}
