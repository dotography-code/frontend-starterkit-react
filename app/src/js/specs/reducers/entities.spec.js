import expect from 'expect';
import reducer from '../../reducers/entities';

describe('entities Reducer', () => {

  it('should handle entities change #1', () => {

    const newEntities = {
      entities: {
        customer: { 1: { name: 'test'} },
        gender: { name: 'Male'}
      }
    }

    const action = {
      data: newEntities
    }

    const expectedState = {
      customer: { 1: { name: 'test'} },
      gender: { name: 'Male' }
    }

    expect(reducer(undefined, action)).toEqual(expectedState);
  })

  it('should handle entities change and assign with old state', () => {

    const oldState = {
      customer: { 1: { name: 'test'} },
      gender: {}
    }

    const newEntities = {
      entities: {
        customer: { 1: { salary: 100 }, 2: { name: 'test2', salary: 20000 } },
        gender: { name: 'Male'}
      }
    }

    const action = {
      data: newEntities
    }

    const expectedState = {
      customer: { 1: { salary: 100 }, 2: { name: 'test2', salary: 20000 } },
      gender: { name: 'Male' }
    }

    expect(reducer(oldState, action)).toEqual(expectedState);
  })

})
