import { all } from 'redux-saga/effects';

import { watchFetchPosts, watchDeletePost, watchVotePost } from './posts';
import { watchFetchCategories } from './categories';

export default function* rootSaga() {
  yield all([
    watchVotePost(),
    watchDeletePost(),
    watchFetchPosts(),
    watchFetchCategories(),
  ]);
}
