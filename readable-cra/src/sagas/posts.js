import { call, put, takeEvery } from 'redux-saga/effects';
import {
  addPost,
  getPost,
  editPost,
  getPosts,
  votePost,
  deletePost,
} from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_NEW_POST = 'ADD_NEW_POST';
export const FILTER_POSTS = 'FILTER_POSTS';

export const FETCH_POST = 'FETCH_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_EDIT_POST = 'FETCH_EDIT_POST';
export const FETCH_VOTE_POST = 'FETCH_VOTE_POST';
export const FETCH_DELETE_POST = 'FETCH_DELETE_POST';
export const FETCH_ADD_NEW_POST = 'FETCH_ADD_NEW_POST';

export function* fetchPost({ postId }) {
  yield put({ type: ADD_POST, post: {}, loading: true });

  const post = yield call(getPost, postId);

  if (!post.error) {
    yield put({ type: ADD_POST, post, loading: false });
  }
}

export function* fetchPosts({ category }) {
  yield put({ type: ADD_POSTS, posts: [], loading: true });

  const posts = yield call(getPosts, category);

  yield put({ type: ADD_POSTS, posts, loading: false });
}

export function* editPostById({ post, details }) {
  const edited = yield call(editPost, post, details);

  yield put({ type: VOTE_POST, edited });
}

export function* votePostById({ post, option }) {
  const voted = yield call(votePost, post, option);

  yield put({ type: VOTE_POST, voted });
}

export function* deletePostById({ post }) {
  const deleted = yield call(deletePost, post);

  yield put({ type: DELETE_POST, deleted });
}

export function* addNewPost({ post }) {
  const added = yield call(addPost, post);

  yield put({ type: ADD_NEW_POST, added });
}

export function* watchFetchPost() {
  yield takeEvery(FETCH_POST, fetchPost);
}

export function* watchFetchPosts() {
  yield takeEvery(FETCH_POSTS, fetchPosts);
}

export function* watchEditPost() {
  yield takeEvery(FETCH_EDIT_POST, editPostById);
}

export function* watchVotePost() {
  yield takeEvery(FETCH_VOTE_POST, votePostById);
}

export function* watchDeletePost() {
  yield takeEvery(FETCH_DELETE_POST, deletePostById);
}

export function* watchAddNewPost() {
  yield takeEvery(FETCH_ADD_NEW_POST, addNewPost);
}
