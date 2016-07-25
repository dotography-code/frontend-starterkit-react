import { endsWith } from 'lodash'

const loading = (state = false, action) => {
  if( endsWith(action.type, '_REQUEST') ) {
    return true;
  } else if( endsWith(action.type, '_SUCCESS') || endsWith(action.type, '_FAILURE') ) {
    return false;
  } else {
    return state;
  }
}

export default loading
