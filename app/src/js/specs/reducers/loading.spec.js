import expect from 'expect';
import reducer from '../../reducers/loading';

describe('loading Reducer', () => {

  it('should return initail state', () => {
    const expectedState = false;
    expect(reducer(undefined, {})).toEqual(false);
  })

  it('should transform state from false to true only *REQUEST action', () => {
    expect(reducer(false, { type: 'SOMETHING_REQUEST' })).toEqual(true);
  })

  it('should transform state from true to false only *SUCCESS OR *FAILURE action', () => {
    expect(reducer(true, { type: 'SOMETHING_SUCCESS' })).toEqual(false);
    expect(reducer(true, { type: 'SOMETHING_FAILURE' })).toEqual(false);
  })

  it('should not transform state when received other actions', () => {
    expect(reducer(false, { type: 'BBB' })).toEqual(false);
  })


})
