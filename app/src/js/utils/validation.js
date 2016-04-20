import { compose } from './data'

export function validateCompose(...funcs) {
  return (data) => compose(...funcs)(data)
}

export function isEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/*
class validator {

  add(validationFunction) {

  }

  test(value) {

  }

}*/
