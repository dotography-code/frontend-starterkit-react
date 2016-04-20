import low from 'lowdb'
import storage from 'lowdb/browser'
import get from 'lodash/get'
import "isomorphic-fetch"
import { API_ROOT } from '../constants/global'

const endpoint = (endpoint) =>(endpoint.indexOf('http://') === -1 && endpoint.indexOf('https://') === -1) ? API_ROOT + endpoint : endpoint

const db = low('db', { storage })

export const setToken = (value) => db('variables').push({ name: 'token', value })
export const getToken = () => {
  const token = db('variables').find({ name: 'token' })
  return get(token, 'value')
}
export const clearToken = () => db('variables').remove({ name: 'token' })

export const loggedIn = () => !!getToken()

export const login = (email, password) => {

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return fetch(endpoint('user/login'), {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  }).then( res => res.json() ).then( data => {

    let status, message = ''
    if(data.error || data.errors) {

      if(data.errors) {
        message = data.errors
      } else {
        message = ['Please enter email and password.']
      }

      return Promise.reject(message)
    } else {
      status = true
      message = 'Successful'
      setToken(data)
    }
    return { status, message, data }

  }, error => {

    error = (error instanceof Error)? error.message: error;
    return Promise.reject(error)

  })

}

export const logout = (cb) => {
  clearToken()
  if(cb) cb()
}
