import { call, put, takeEvery } from 'redux-saga/effects';
import {
  addComment,
  getComments,
  editComment,
  voteComment,
  deleteComment,
} from '../utils/api';
import guid from '../utils/guid';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_CONTENT';

export const FETCH_COMMENTS = 'TESTE';
export const FETCH_ADD_COMMENT = 'FETCH_ADD_COMMENT';
export const FETCH_EDIT_COMMENT = 'FETCH_EDIT_COMMENT';
export const FETCH_VOTE_COMMENT = 'FETCH_VOTE_COOMENT';
export const FETCH_DELETE_COMMENT = 'FETCH_REMOVE_COMMENT';

export const TOGGLE_ADD_COMMENT_MODAL = 'TOGGLE_ADD_COMMENT_MODAL';
export const TOGGLE_EDIT_COMMENT_MODAL = 'TOGGLE_EDIT_COMMENT_MODAL';

export const WATCH_TOGGLE_ADD_COMMENT_MODAL = 'WATCH_TOGGLE_ADD_COMMENT_MODAL';
export const WATCH_TOGGLE_EDIT_COMMENT_MODAL = 'WATCH_TOGGLE_EDIT_COMMENT_MODAL';

function* addNewComment({ post, comment }) {
  const newComment = {
    ...comment,
    id: guid(),
    parentId: post.id,
    timestamp: (+ new Date()), //eslint-disable-line
  };

  const added = yield call(addComment, newComment);

  yield put({ type: ADD_COMMENT, added });
}

function* fetchComments({ postId }) {
  const comments = yield call(getComments, postId);

  yield put({ type: ADD_COMMENTS, comments });
}

function* editCommentById({ details }) {
  const edited = yield call(editComment, details.id, details);

  yield put({ type: EDIT_COMMENT, edited });
}

function* voteCommentById({ comment, option }) {
  const voted = yield call(voteComment, comment, option);

  yield put({ type: VOTE_COMMENT, voted });
}

function* deleteCommentById({ comment }) {
  const deleted = yield call(deleteComment, comment);

  yield put({ type: DELETE_COMMENT, deleted });
}

function* toggleAddPostModal() {
  yield put({ type: TOGGLE_ADD_COMMENT_MODAL });
}

function* toggleEditModal(comment) {
  yield put({ type: TOGGLE_EDIT_COMMENT_MODAL, comment });
}

export function* watchAddComment() {
  yield takeEvery(FETCH_ADD_COMMENT, addNewComment);
}

export function* watchFetchComments() {
  yield takeEvery(FETCH_COMMENTS, fetchComments);
}

export function* watchEditComment() {
  yield takeEvery(FETCH_EDIT_COMMENT, editCommentById);
}

export function* watchVoteComment() {
  yield takeEvery(FETCH_VOTE_COMMENT, voteCommentById);
}

export function* watchDeleteComment() {
  yield takeEvery(FETCH_DELETE_COMMENT, deleteCommentById);
}

export function* watchAddNewCommentModal() {
  yield takeEvery(WATCH_TOGGLE_ADD_COMMENT_MODAL, toggleAddPostModal);
}

export function* watchEditCommentModal() {
  yield takeEvery(WATCH_TOGGLE_EDIT_COMMENT_MODAL, toggleEditModal);
}
