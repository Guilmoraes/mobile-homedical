import { call, cancel, fork, put, take } from 'redux-saga/effects'
import { getProfessionalInfo, syncProfessionalDuties, syncProfessionalPatients } from "../professional/ProfessionalSaga";
import _ from 'lodash'
import SyncActions from '../../Redux/sync/SyncRedux'
import SyncScheduleActions from '../../Redux/sync/SyncScheduleRedux'
import ScheduleActions from '../../Redux/schedule/ScheduleRedux'

import { saveSchedule, getProfessionalSchedulesRemote, syncSchedules } from "../schedule/ScheduleSaga";

export function* startSync(professionalApi: any, scheduleApi: any) {

  const professional = yield call(getProfessionalInfo, professionalApi);

  if (!_.isEmpty(professional)) {
    yield call(syncData, professionalApi, scheduleApi, professional);
  }

}

export function* syncSchedule(scheduleApi: any, professionalApi: any, schedule: any) {
  try {
    yield call(saveSchedule, scheduleApi, schedule.schedule);
    yield put(SyncScheduleActions.syncScheduleRequestSuccess());
    yield put(ScheduleActions.refreshScheduleScreen());
  } catch (e) {
    yield put(SyncScheduleActions.syncScheduleRequestError());
  }

  yield put(SyncScheduleActions.refreshState())
}

export function* syncData(professionalApi: any, scheduleApi: any, professional: any) {

  try {

    yield call(syncProfessionalPatients, professionalApi, professional.id);
    yield call(syncProfessionalDuties, professionalApi, professional.id);
    yield call(syncSchedules, scheduleApi);
    yield call(getProfessionalSchedulesRemote, scheduleApi, professional);
    yield put(SyncActions.syncRequestSuccess())

  } catch (e) {
    yield put(SyncActions.syncRequestError());
  }

}
