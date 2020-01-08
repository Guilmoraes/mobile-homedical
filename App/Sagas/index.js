import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import PasswordAPI from '../Services/password/PasswordApi'
import CityAPI from '../Services/city/CityApi'
import SpecialtyAPI from '../Services/specialty/SpecialtyApi'
import ProfessionalAPI from '../Services/professional/ProfessionalApi'
import DocumentAPI from '../Services/document/DocumentApi'
import ScheduleAPI from '../Services/schedule/scheduleApi'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { PasswordTypes } from '../Redux/PasswordRedux'
import { AccountTypes } from '../Redux/AccountRedux'
import { ForgotPasswordTypes } from "../Redux/ForgotPasswordRedux";
import { CityTypes } from "../Redux/city/CityRedux";
import { SpecialtyTypes } from "../Redux/specialty/SpecialtyRedux";
import { ProfessionalTypes } from "../Redux/professional/ProfessionalRedux";
import { SyncTypes } from "../Redux/sync/SyncRedux";
import { PatientTypes } from "../Redux/patient/PatientRedux";
import { DutyTypes } from "../Redux/duty/DutyRedux";
import { ScheduleTypes } from "../Redux/schedule/ScheduleRedux";
import { DocumentTypes } from "../Redux/document/DocumentRedux";
import { SyncScheduleTypes } from "../Redux/sync/SyncScheduleRedux";
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout, loginLoad, updateAuthToken } from './LoginSagas'
import { register } from './RegisterSagas'
import { changePassword } from './PasswordSagas'
import { getAccount, updateAccount, checkIfTermIsAccepted, acceptTerm } from './AccountSagas'
import { getForgotPassword } from "./ForgotPasswordSagas";
import { findAllCitiesByName } from "./city/CitySagas";
import { findSpecialties } from "./specialty/SpecialtySaga";
import {
  registerProfessional,
  getProfessionalInfo,
  professionalSetAuthToken,
  updateProfessional
} from "./professional/ProfessionalSaga";
import { startSync, syncSchedule } from "./sync/SyncSaga";
import { getPatients } from "./patient/PatientSaga";
import { getDuties } from "./duty/DutySaga";
import { createSchedule, getProfessionalSchedules, scheduleSetAuthToken, updateSchedule } from "./schedule/ScheduleSaga";
import { startCheckDocumentProcess, documentSetAuthToken, uploadDocuments } from "./document/DocumentSagas";
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
const passwordApi = DebugConfig.useFixtures ? FixtureAPI : PasswordAPI.create();
const cityApi = DebugConfig.useFixtures ? FixtureAPI : CityAPI.create();
const specialtyApi = DebugConfig.useFixtures ? FixtureAPI : SpecialtyAPI.create();
const scheduleApi = ScheduleAPI.create();
const professionalApi = ProfessionalAPI.create();
const documentApi = DocumentAPI.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(PasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),

    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, getForgotPassword, passwordApi),

    takeLatest(CityTypes.CITY_REQUEST, findAllCitiesByName, cityApi),

    takeLatest(SpecialtyTypes.SPECIALTY_REQUEST, findSpecialties, specialtyApi),

    takeLatest(ProfessionalTypes.REGISTER_PROFESSIONAL_REQUEST, registerProfessional, professionalApi),
    takeLatest(ProfessionalTypes.GET_MY_INFO_REQUEST, getProfessionalInfo, professionalApi),
    takeLatest(ProfessionalTypes.SET_AUTH_TOKEN, professionalSetAuthToken, professionalApi),
    takeLatest(ProfessionalTypes.UPDATE_PROFESSIONAL_REQUEST, updateProfessional, professionalApi),
    takeLatest(LoginTypes.UPDATE_AUTH_TOKEN, updateAuthToken, api),
    takeLatest(SyncTypes.SYNC_REQUEST, startSync, professionalApi, scheduleApi),

    takeLatest(SyncScheduleTypes.SET_AUTH_TOKEN, scheduleSetAuthToken, scheduleApi),
    takeLatest(SyncScheduleTypes.SYNC_SCHEDULE_REQUEST, syncSchedule, scheduleApi, professionalApi),

    takeLatest(PatientTypes.LOCAL_PATIENT_REQUEST, getPatients),
    takeLatest(DutyTypes.LOCAL_DUTY_REQUEST, getDuties),
    takeLatest(ScheduleTypes.CREATE_SCHEDULE_REQUEST, createSchedule),
    takeLatest(ScheduleTypes.UPDATE_SCHEDULE_REQUEST, updateSchedule),
    takeLatest(ScheduleTypes.GET_PROFESSIONAL_SCHEDULES_REQUEST, getProfessionalSchedules),
    takeLatest(DocumentTypes.START_CHECK_DOCUMENT_PROCESS, startCheckDocumentProcess, documentApi),
    takeLatest(DocumentTypes.SET_AUTH_TOKEN, documentSetAuthToken, documentApi),
    takeLatest(DocumentTypes.UPLOAD_DOCUMENTS, uploadDocuments, documentApi),
    takeLatest(AccountTypes.START_PROCESS_OF_CHECK_IF_USER_HAD_ACCEPTED_TERM, checkIfTermIsAccepted, api),
    takeLatest(AccountTypes.REQUEST_TO_ACCEPT_TERMS, acceptTerm, api)
  ])
}
