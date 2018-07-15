import {
  ADD_COMMENT,
  ADD_COMMENTS,
  EDIT_COMMENT,
  VOTE_COMMENT,
  DELETE_COMMENT,
  TOGGLE_ADD_COMMENT_MODAL,
  TOGGLE_EDIT_COMMENT_MODAL,
} from '../sagas/comments';

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

const toggleModal = modal => (state, { comment = {} }) => ({
  ...state,
  comment: { ...comment.comment },
  [modal]: !state[modal],
});

const addNewComment = (state, { added }) => {
  const { comments } = state;

  return {
    ...state,
    comments: [...comments, added],
    showAddNewCommentModal: false,
  };
};

const editComment = (state, { edited }) => {
  const { comments } = state;

  const commentIndex = [...comments].findIndex(c => c.id === edited.id);
  const filtered = [...comments].filter(c => c.id !== edited.id);

  const newComment = {
    ...edited,
  };

  filtered.splice(commentIndex, 0, { ...newComment });

  return {
    ...state,
    comments: [...filtered],
    showEditCommentModal: false,
  };
};

const initialState = {
  comments: [],
  showEditCommentModal: false,
  showAddNewCommentModal: false,
};

export default function comments(state = initialState, action) {
  const actions = {
    [ADD_COMMENT]: addNewComment,
    [ADD_COMMENTS]: addComments,
    [VOTE_COMMENT]: voteComment,
    [EDIT_COMMENT]: editComment,
    [DELETE_COMMENT]: deleteComment,
    [TOGGLE_EDIT_COMMENT_MODAL]: toggleModal('showEditCommentModal'),
    [TOGGLE_ADD_COMMENT_MODAL]: toggleModal('showAddNewCommentModal'),
  };

  const noop = () => state;
  const fn = actions[action.type] || noop;

  return fn(state, action);
}
