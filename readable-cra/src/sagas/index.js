import { all } from 'redux-saga/effects';

import {
  watchEditPost,
  watchVotePost,
  watchFetchPost,
  watchFetchPosts,
  watchAddNewPost,
  watchDeletePost,
  watchEditPostModal,
  watchAddNewPostModal,
} from './posts';

import {
  watchAddComment,
  watchEditComment,
  watchVoteComment,
  watchDeleteComment,
  watchFetchComments,
  watchEditCommentModal,
  watchAddNewCommentModal,
} from './comments';

import { watchFetchCategories } from './categories';

export default function* rootSaga() {
  yield all([
    watchEditPost(),
    watchVotePost(),
    watchFetchPost(),
    watchFetchPosts(),
    watchAddNewPost(),
    watchDeletePost(),
    watchEditPostModal(),
    watchAddNewPostModal(),

    watchAddComment(),
    watchEditComment(),
    watchVoteComment(),
    watchDeleteComment(),
    watchFetchComments(),
    watchEditCommentModal(),
    watchAddNewCommentModal(),

    watchFetchCategories(),
  ]);
}
