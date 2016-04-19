import { compose } from 'redux'
import moment from 'moment'
import { assign, reduce, isObject, isArray, isNull } from 'lodash'

export function transformCompose(...funcs) {
  return (data) => compose(tranfromUndefined, ...funcs)(data)
}

export function tranfromUndefined(data = undefined) {
  return (data === undefined || isNull(data) || data.length <= 0 )? 'N/A' : data
}

export function transformTimestampToDateFormat(format = 'MMMM D, YYYY') {
  return (timestamp) => ( timestamp == null )? tranfromUndefined(timestamp) :  moment.unix(timestamp/1000).format(format)
}

export function transformDOBToAge(timestamp) {
  if( timestamp == null ) {
    return tranfromUndefined(timestamp);
  }

  const now = moment();
  const dob = moment.unix(timestamp/1000);
  return now.diff(dob, 'years');
}

export function transformBooleanToYesNo(data) {
  return (data == true)? 'Yes' : 'No'
}

export function transformToValueWithKeys(...keys) {
  return (data) => {
    return (!isObject(data))? tranfromUndefined() : reduce(keys, (reduced, key) => reduced[key] , data)
  }
}

export function transformToArrayWithKeys(...keys) {
  return (data) => reduce(keys, (reduced, key) => {
    return reduced.concat((Array.isArray(key))? transformToValueWithKeys(...key)(data) : data[key])
  }, [])
}

export function joinArrayWith(glue = ' ') {
  return (data) => data.join(glue)
}


const entitiesArray = (obj, key, entities, additional) => {
  return obj.map((value) => {
    return entitiesReduceData(entitiesValue(value, key, entities, additional), entities, additional)
  })
}

const entitiesValue = (obj, key, entities, additional) => {
  const entities_key = (entities[key] === undefined && additional[key] !== undefined)? additional[key] : key
  return (entities[entities_key] !== undefined && entities[entities_key][obj] !== undefined)? entities[entities_key][obj] : obj
}

export const entitiesReduceData = (data, entities = {}, additional = {}) => {

  if( data === undefined ) {
    throw new Error('Data cannot be undefined')
  }

  return reduce(data, (result, obj, key) => {
    if(isArray(obj)) {
      obj = entitiesArray(obj, key, entities, additional)
    } else {
      obj = entitiesValue(obj, key, entities, additional)
      if(isObject(obj)) {
        obj = entitiesReduceData(obj, entities, additional)
      }
    }

    return assign({}, result, { [key]: obj })
  }, data)
}
