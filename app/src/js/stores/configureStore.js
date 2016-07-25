'user strict';

import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'reducers'
import callAPIMiddleware from 'middlewares/callAPIMiddleware'
import DevTools from 'containers/DevTools'

const storeEnhancer = [applyMiddleware(callAPIMiddleware)]

if (process.env.NODE_ENV !== 'production') {
	storeEnhancer.push(DevTools.instrument())
}

const finalCreateStore = compose(...storeEnhancer)(createStore)

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}