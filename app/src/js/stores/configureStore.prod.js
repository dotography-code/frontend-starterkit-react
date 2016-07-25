'user strict';

import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import callAPIMiddleware from '../middlewares/callAPIMiddleware'
import DevTools from '../containers/DevTools'

const finalCreateStore = compose(
  applyMiddleware(callAPIMiddleware)
)(createStore)

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}