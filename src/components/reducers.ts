import { combineReducers } from 'redux';
import { createCollectionReducer } from '../lib/collection'
import { createModelReducer } from '../lib/model'

const rootReducer = combineReducers({
    projectModel: createModelReducer('PROJECT_MODEL'),
    projectList: createCollectionReducer('PROJECT_LIST')
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>