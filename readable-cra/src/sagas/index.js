import { all } from 'redux-saga/effects';

import {
  watchEditPost,
  watchVotePost,
  watchFetchPost,
  watchFetchPosts,
  watchAddNewPost,
  watchDeletePost,
} from './posts';

import {
  watchAddComment,
  watchEditComment,
  watchVoteComment,
  watchDeleteComment,
  watchFetchComments,
} from './comments';

// import { watchFetchPosts, watchDeletePost, watchVotePost } from './posts';
import { watchFetchCategories } from './categories';

export default function* rootSaga() {
  yield all([
    watchEditPost(),
    watchVotePost(),
    watchFetchPost(),
    watchFetchPosts(),
    watchAddNewPost(),
    watchDeletePost(),

    watchAddComment(),
    watchEditComment(),
    watchVoteComment(),
    watchDeleteComment(),
    watchFetchComments(),

    watchFetchCategories(),
  ]);
}
