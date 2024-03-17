import { combineReducers } from 'redux';
import { createCollectionReducer } from '../lib/collection'

const rootReducer = combineReducers({ });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;