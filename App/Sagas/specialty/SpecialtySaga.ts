import {call, put, select} from 'redux-saga/effects'
import SpecialtyActions from '../../Redux/specialty/SpecialtyRedux'

export function* findSpecialties(specialtyApi: any) {

  const response = yield call(specialtyApi.findSpecialties);

  if (response.ok) {

    let page = {
      content: response.data,
      firstPage: true,
      lastPage: true
    };

    yield put(SpecialtyActions.specialtyRequestSuccess(page))
  } else {
    yield put(SpecialtyActions.specialtyRequestError())
  }

}
