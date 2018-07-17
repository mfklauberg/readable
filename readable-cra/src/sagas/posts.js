import { call, put, takeEvery } from 'redux-saga/effects';
import {
  addPost,
  getPost,
  editPost,
  getPosts,
  votePost,
  deletePost,
} from '../utils/api';
import guid from '../utils/guid';

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

export const TOGGLE_ADD_POST_MODAL = 'TOGGLE_ADD_POST_MODAL';
export const TOGGLE_EDIT_POST_MODAL = 'TOGGLE_EDIT_POST_MODAL';

export const WATCH_TOGGLE_ADD_POST_MODAL = 'WATCH_TOGGLE_ADD_POST_MODAL';
export const WATCH_TOGGLE_EDIT_POST_MODAL = 'WATCH_TOGGLE_EDIT_POST_MODAL';

function* fetchPost({ postId }) {
  yield put({ type: ADD_POST, post: {}, loading: true });

  const post = yield call(getPost, postId);

  if (post.id && !post.error) {
    yield put({ type: ADD_POST, post, loading: false });
  } else {
    const emptyPost = { deleted: true, id: postId };
    yield put({ type: ADD_POST, post: emptyPost, loading: false });
  }
}

function* fetchPosts({ category }) {
  yield put({ type: ADD_POSTS, posts: [], loading: true });

  const posts = yield call(getPosts, category);

  yield put({ type: ADD_POSTS, posts, loading: false });
}

function* editPostById({ post, details }) {
  const edited = yield call(editPost, post, details);

  yield put({ type: EDIT_POST, edited });
}

function* votePostById({ post, option }) {
  const voted = yield call(votePost, post, option);

  yield put({ type: VOTE_POST, voted });
}

function* deletePostById({ post }) {
  const deleted = yield call(deletePost, post);

  yield put({ type: DELETE_POST, deleted });
}

function* addNewPost({ post }) {
  const newPost = {
    ...post,
    id: guid(),
    timestamp: (+ new Date()), //eslint-disable-line
  };

  const added = yield call(addPost, newPost);

  yield put({ type: ADD_NEW_POST, added });
}

function* toggleAddPostModal() {
  yield put({ type: TOGGLE_ADD_POST_MODAL });
}

function* toggleEditModal(post) {
  yield put({ type: TOGGLE_EDIT_POST_MODAL, post });
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

export function* watchAddNewPostModal() {
  yield takeEvery(WATCH_TOGGLE_ADD_POST_MODAL, toggleAddPostModal);
}

export function* watchEditPostModal() {
  yield takeEvery(WATCH_TOGGLE_EDIT_POST_MODAL, toggleEditModal);
}
