import { ADD_CATEGORIES } from '../sagas/categories';

const addCategories = (state, { categories }) => [...categories];

export default function categories(state = [], action) {
  const actions = {
    [ADD_CATEGORIES]: addCategories,
  };

  const noop = () => state;
  const fn = actions[action.type] || noop;

  return fn(state, action);
}
