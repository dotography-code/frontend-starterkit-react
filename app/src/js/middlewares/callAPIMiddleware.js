'user strict'

import "isomorphic-fetch";
import { assign, reduce } from 'lodash'
import { Schema, normalize } from 'normalizr'

import api from '../services/api'
import { Auth } from '../services/auth'

export function paginationFromAPI(json) {
  if(!json.count) {
    return undefined
  }

  const total = json.count;
  const { offset = 0, limit = 500 } = json.params;
  const totalPage = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit);

  const params = reduce( json.params, (reduced, data, key) => {
    reduced[key] = data
    return reduced
  }, {})


  return assign({}, {
    totalPage,
    currentPage,
		total
  }, params)

}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export function callApi(endpoint, options = {}, schema) {
	
	const { token } = Auth.getToken()
	let payload = options.body
	
	if (!options.method) {
		options.method = 'get'
		payload = options.query
	}
	
	return api[options.method.toLowerCase()](endpoint, payload, { "Authorization": token })
		.then(json => {
      if (json.errors || json.error) {
        return Promise.reject(json.errors || json.error)
      }

      const pagination = paginationFromAPI(json);
      const data = (schema) ? normalize(json.data, schema) : { result: json.data }

			return pagination ? assign({}, data, pagination) : data
    }, err => {
      return Promise.reject([ (err instanceof Error)? err.message: err])
    })
}

function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      endpoint,
      options = {},
			schema = '',
      shouldCallAPI = () => true,
      payload = {}
    } = action

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof endpoint !== 'string') {
			throw new Error('Specify a string endpoint URL.')
		}

    if (!shouldCallAPI(getState())) {
      return
    }

    const [ requestType, successType, failureType ] = types

    next(assign({}, payload, {
      type: requestType
    }))

		return callApi(endpoint, options, schema).then(
			response => {
				return next(assign({}, payload, {
					type: successType,
					data: response,
					receivedAt: Date.now()
				}))
			},
			error => {
				return next(assign({}, payload, {
					type: failureType,
					error
				}))
			}
		)
	}
}

export default callAPIMiddleware;
