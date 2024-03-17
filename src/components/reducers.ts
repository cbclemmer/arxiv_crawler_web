import { combineReducers } from 'redux';
import { createCollectionReducer } from '../lib/collection'

const rootReducer = combineReducers({
    projectList: createCollectionReducer('PROJECT_LIST')
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;