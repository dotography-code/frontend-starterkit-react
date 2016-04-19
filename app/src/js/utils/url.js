import { map, isObject } from 'lodash'

function buildQuery(value, key) {
  if(isObject(value)) {
    return map(value, (v, i) => buildQuery(v, key + '[' + i + ']')).join('&');
  } else {
    return addToString(key, value);
  }
}

function addToString(key, value) {
  return key + '=' + value
}

export function endpointWithParams(url, params) {
  const arrayQuery = map(params, buildQuery)
  const query = arrayQuery.length > 0 ? '?' + arrayQuery.join('&') : ''
  return url + query
}
