import { endsWith, assign, unset } from 'lodash'

const error = (state = {}, action) => {


  if( endsWith(action.type, '_FAILURE') || endsWith(action.type, '_ERROR') ) {

    return assign({}, state, { [action.type.replace(/(_FAILURE|_ERROR)/, '')]: (action.error)? action.error: 'ERROR' })

  } else if( endsWith(action.type, '_SUCCESS') || endsWith(action.type, '_REQUEST') ) {
    const  newState = assign({}, state)
    unset(newState, action.type.replace(/(_SUCCESS|_REQUEST)/, ''));
    return newState;

  } else {

    return state;
  }
}

export default error
