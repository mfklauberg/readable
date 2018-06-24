import { call, put, takeEvery } from 'redux-saga/effects';
import { getPosts, deletePost, votePost } from '../utils/api';

export const ADD_POSTS = 'ADD_POSTS';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FILTER_POSTS = 'FILTER_POSTS';
export const FETCH_VOTE_POST = 'FETCH_VOTE_POST';
export const FETCH_DELETE_POST = 'REQUEST_DELETE_POST';

export function* fetchPosts({ category }) {
  const posts = yield call(getPosts, category);

  yield put({ type: ADD_POSTS, posts });
}

export function* fetchDeletePost({ post }) {
  const deleted = yield call(deletePost, post);

  yield put({ type: DELETE_POST, deleted });
}

export function* fetchVotePost({ post, option }) {
  const voted = yield call(votePost, post, option);

  yield put({ type: VOTE_POST, voted });
}

export function* watchFetchPosts() {
  yield takeEvery(FETCH_POSTS, fetchPosts);
}

export function* watchDeletePost() {
  yield takeEvery(FETCH_DELETE_POST, fetchDeletePost);
}

export function* watchVotePost() {
  yield takeEvery(FETCH_VOTE_POST, fetchVotePost);
}
