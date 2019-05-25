import authReducer from '../../reducers/auth';

//*** @@INIT ***
test('should setup default state', () => {
  const defaultState = authReducer(undefined, { type: '@@INIT' })
  expect(defaultState).toEqual({});
});

const mockUserUID = 'randomUIDString'

//*** LOGIN ***
test('should set uid for login', () => {
  const state = {};
  const action = {
    type: 'LOGIN',
    uid: mockUserUID
  }
  const newState = authReducer(state, action)
  expect(newState.uid).toBe(mockUserUID)
});

//*** LOGOUT ***
test('should clear uid for logout', () => {
  const state = {
    uid: mockUserUID
  }
  const action = {
    type: 'LOGOUT'
  }
  const newState = authReducer(state, action);
  expect(newState).toEqual({});
});