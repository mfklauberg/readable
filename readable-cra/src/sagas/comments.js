import { call, put, takeEvery } from 'redux-saga/effects';
import {
  addComment,
  getComments,
  editComment,
  voteComment,
  deleteComment,
} from '../utils/api';

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

export function* addNewComment({ post, comment }) {
  const added = yield call(addComment, post, comment);

  yield put({ type: ADD_COMMENT, added });
}

export function* fetchComments({ postId }) {
  const comments = yield call(getComments, postId);

  yield put({ type: ADD_COMMENTS, comments });
}

export function* editCommentById({ comment, details }) {
  const edited = yield call(editComment, comment, details);

  yield put({ type: EDIT_COMMENT, edited });
}

export function* voteCommentById({ comment, option }) {
  const voted = yield call(voteComment, comment, option);

  yield put({ type: VOTE_COMMENT, voted });
}

export function* deleteCommentById({ comment }) {
  const deleted = yield call(deleteComment, comment);

  yield put({ type: DELETE_COMMENT, deleted });
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
