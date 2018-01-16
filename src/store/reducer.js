import { createStore } from 'redux';

import { filtersReducer } from './filters.js';

const store = createStore(filtersReducer);

export default store;