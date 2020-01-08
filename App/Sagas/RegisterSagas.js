import { call, put } from 'redux-saga/effects'
import RegisterActions from '../Redux/RegisterRedux'

// attempts to register
export function * register (api, { user }) {
  const response = yield call(api.register, user)
  // success?
  if (response.ok) {
    yield put(RegisterActions.registerSuccess())
  } else {
    yield put(RegisterActions.registerFailure(response.data))
  }
}
