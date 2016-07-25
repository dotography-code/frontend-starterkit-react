'user restrict'

import get from 'lodash/get'
import map from 'lodash/map'
import find from 'lodash/find'
import isArray from 'lodash/isArray'
import { getVariable, setVariable, clearVariable } from '../db'
import api from '../api'

/* Auth */

export const Auth = {
  setToken: (value) => setToken(value),
  getToken: () => getToken(),

  isLoggedIn: () => !!getToken(),
  login: (email, password) => login(email, password),
  logout: (cb) => logout(cb)
}

const setToken = (value) => {
  clearVariable('token')
  setVariable('token', value)
}

const getToken = () => {
  const token = getVariable('token')
  return get(token, 'value')
}

const promiseHandleError = (error) => {
  error = (error instanceof Error)? error.message: error;
  return Promise.reject([error])
}

const login = (email, password) => {

  return api.post('user/login', { email, password })
          .then( data => {

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
            }

            return { status, message, data }

          }, promiseHandleError )

}

const logout = (cb) => {
  Permission.destroy()
  clearVariable('token')
  if(cb) cb()
}

/* Permission */

export const Permission = {
  access: (action) => {

    const currentPermission = find(getPermission(), p => p.permission.name == action || (isArray(action) && action.indexOf(p.permission.name) != -1) || p.permission.name == 'admin')
    return currentPermission != undefined
  },
  get: () => getPermission(),
  set: (value) => setPermission(value),
  load: (token) => loadPermission(token),
  destroy: () => clearVariable('permissions')
}

const getPermission = () => {
  const permission =  getVariable('permissions')
  return get(permission, 'value')
}

const setPermission = (value) => {
  clearVariable('permissions')
  setVariable('permissions', value)
}

const loadPermission = (token) => {

  return api.get('user/permissions', null, { "Authorization": token })
          .then( data => {
            if(data.errors) {
              return Promise.reject(data.errors)
            } else {
              return data.data
            }
          }, promiseHandleError )
}

