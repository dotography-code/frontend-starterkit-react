import { combineReducers } from 'redux'
import entities from 'reducers/entities'
import error from 'reducers/error'
import loading from 'reducers/loading'

const rootReducer = combineReducers({
	entities,
	error,
	loading,
});

export default rootReducer
