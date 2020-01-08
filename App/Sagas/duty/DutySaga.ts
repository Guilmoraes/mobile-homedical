import {all, call, fork, put, select} from 'redux-saga/effects'
import DutyActions from '../../Redux/duty/DutyRedux'
import DutyQueries from '../../Data/queries/DutyQueries'

export function* getDuties() {

  let duties = DutyQueries.findByIsProfessionalDuty();

  let page = {
    content: duties,
    firstPage: true,
    lastPage: true
  };

  yield (put(DutyActions.localDutyRequestSuccess(page)));

}

export function* dutySetAuthToken(dutyApi: any, {token}: any) {
  yield call(dutyApi.setAuthToken, token);
}
