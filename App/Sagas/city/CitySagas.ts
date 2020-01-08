import {call, put, select} from 'redux-saga/effects'
import CityActions from '../../Redux/city/CityRedux'

export function* findAllCitiesByName(cityApi: any, query: any) {
  const response = yield call(cityApi.findAllCitiesByName, query.param);

  if (response.ok) {
    yield put(CityActions.cityRequestSuccess(response.data))
  } else {
    yield put(CityActions.cityRequestError())
  }

}
