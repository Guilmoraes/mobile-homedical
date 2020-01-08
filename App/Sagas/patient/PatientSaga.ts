import { call, put, select } from 'redux-saga/effects'
import PatientActions from '../../Redux/patient/PatientRedux'
import PatientQueries from '../../Data/queries/PatientQueries'
import FusedLocation from '../../Models/FusedLocation';
import _ from 'lodash'
import Patient from '../../Data/model/Patient';

export function* getPatients() {

  let patients = PatientQueries.findByIsProfessionalPatient();

  let page = {
    content: patients,
    firstPage: true,
    lastPage: true
  };

  yield (put(PatientActions.localPatientRequestSuccess(page)));

}

