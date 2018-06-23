import { call, put, takeEvery } from 'redux-saga/effects';
import { getCategories } from '../utils/api';

export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function* fetchCategories() {
  const { categories } = yield call(getCategories);

  const normalized = Object.values(categories).map(category => category.name);

  yield put({ type: ADD_CATEGORIES, categories: [...normalized] });
}

export function* watchFetchCategories() {
  yield takeEvery(FETCH_CATEGORIES, fetchCategories);
}
