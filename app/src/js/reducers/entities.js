'user strict';
import { assign } from 'lodash'

const entities = (state = {}, action) => {

  if( action.data && action.data.entities ) {
    return assign({}, state, action.data.entities);
  }

  return state;
}

export default entities;
