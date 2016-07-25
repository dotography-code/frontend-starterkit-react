'user restrict'

import "isomorphic-fetch"
import { trimStart, forEach, assign, isUndefined, omitBy } from 'lodash'
import { API_ROOT } from '../../constants/global'
import { endpointWithParams } from '../../utils/url'
import { compose } from '../../utils/data'

const prepareHeader = (data) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  forEach(data, (value, key) => {
    headers.append(key, value);
  })
  return headers
}

const prepareOptions = (method, headers = {}, body) => omitBy(assign({}, { method, headers: prepareHeader(headers) }, { body }), isUndefined)

const urlTrimStart = (trim) => (url) => trimStart(url, trim)
const urlWithQuery = (query) => (url) => endpointWithParams(url, query)
const apiUrl = (endpoint) =>(endpoint.indexOf('http://') === -1 && endpoint.indexOf('https://') === -1) ? API_ROOT + endpoint : endpoint

const buildUrl = (endpoint, query = {}) => compose(apiUrl, urlWithQuery(query), urlTrimStart('/'))(endpoint)

const callApi = (url, options) => fetch(url, options).then( res => res.json() )

const getMethod = (endpoint, query = {}, headers = {}) => {
  const options = prepareOptions('get', headers)
  const url = buildUrl(endpoint, query)
  return callApi(url, options)
}

const postMethod = (endpoint, data = {}, headers = {}) => {
  const options = prepareOptions('post', headers, JSON.stringify(data))
  const url = buildUrl(endpoint)
  return callApi(url, options)
}

const putMethod = (endpoint, data = {}, headers = {}) => {
  const options = prepareOptions('put', headers, JSON.stringify(data))
  const url = buildUrl(endpoint)
  return callApi(url, options)
}

const deleteMethod = (endpoint, data = {}, headers = {}) => {
  const options = prepareOptions('delete', headers, JSON.stringify(data))
  const url = buildUrl(endpoint)
  return callApi(url, options)
}

export default {
  buildUrl,
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod
}
