'user restrict'

import low from 'lowdb'
import storage from 'lowdb/browser'

const db = low('db', { storage })

export const setVariable = (name, value) => db('variables').push({ name , value })
export const clearVariable = (name) => db('variables').remove({ name })
export const getVariable = (name) => db('variables').find({ name })
