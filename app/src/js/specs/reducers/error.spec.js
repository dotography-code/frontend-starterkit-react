import expect from 'expect';
import reducer from '../../reducers/error';

describe('error Reducer', () => {

  it('should return initail state', () => {
    expect(reducer(undefined, {})).toEqual({});
  })

  it('should transform state from {} to "ERROR" when *FAILURE action without error object', () => {
    expect(reducer({}, { type: 'SOMETHING_FAILURE'  })).toEqual({ "SOMETHING" : "ERROR" });
  })

  it('should transform state from {} to error object when *FAILURE action with error object', () => {
    expect(reducer({}, { type: 'SOMETHING_FAILURE', error: "THIS IS ERROR MESSAGE" })).toEqual({ "SOMETHING" : "THIS IS ERROR MESSAGE" });
  })

  it('should transform state from error to empty object when *SUCCESS action', () => {
    expect(reducer({ "SOMETHING" : "THIS IS ERROR MESSAGE" }, { type: 'SOMETHING_SUCCESS' })).toEqual({});
  })

  it('should not transform state when received other actions', () => {
    expect(reducer({ "SOMETHING" : "THIS IS ERROR MESSAGE" }, { type: 'BBB' })).toEqual({ "SOMETHING" : "THIS IS ERROR MESSAGE" });
  })


})
