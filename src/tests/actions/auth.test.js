// Actions
import { login, logout } from '../../actions/auth';

const mockId = 'randomIDString'

//*** LOGIN ***
test('should setup login action object', () => {
  const action = login(mockId)
  expect(action).toEqual({
    type: 'LOGIN',
    uid: mockId
  })
});

//*** LOGOUT ***
test('should setup logout action object', () => {
  const action = logout()
  expect(action).toEqual({
    type: 'LOGOUT'
  })
});