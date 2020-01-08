import realm from "../Db"
import moment from 'moment'
import _ from 'lodash'
import HealthOperatorQueries from '../../Data/queries/HealthOperatorQueries'
import PhoneQueries from '../../Data/queries/PhoneQueries'
import AddressQueries from '../../Data/queries/AddressQueries'
import { Patient } from "../../Models/Patient";
import RealmPatient from '../../Data/model/Patient'
import { Results } from "realm";
const uuid = require('react-native-uuid')

class PatientQueries {

  findById(id: string) {
    return realm.objects('Patient').filtered('id = $0', id)[0];
  }

  findAll() {
    return realm.objects('Patient');
  }

  findByIsProfessionalPatient(): Results<RealmPatient> {
    return realm.objects('Patient').filtered('isProfessionalPatient = $0', true)
  }

  updateFieldIsProfessionalPatients(patients: Patient[], isProfessionalPatient: boolean) {
    realm.write(() => {
      _.each(patients, function (patient) {
        let realmPatient: any = realm.objects('Patient').filtered('id = $0', patient.id)[0];
        realmPatient.isProfessionalPatient = isProfessionalPatient;
      });
    });
  }

  savePatientFromSyncSchedule(patientToSave: Patient, isProfessionalPatient: boolean, isUpdate: boolean) {
    let patient = {
      id: patientToSave.id,
      isProfessionalPatient: isProfessionalPatient,
      name: patientToSave.name
    }
    
    return realm.create('Patient', patient, isUpdate)
  }

  savePatient(patientToSave: any, isProfessionalPatient: boolean, isUpdate: boolean) {
    let healthOperator = HealthOperatorQueries.findById(patientToSave.healthOperator.id);

    let patient = {
      id: patientToSave.id ? patientToSave.id : uuid.v1(),
      name: patientToSave.name,
      birthdate: moment(patientToSave.birthdate, ['DD/MM/YYYY', 'YYYY-MM-DD']).toDate(),
      healthOperator: !_.isEmpty(healthOperator) ? healthOperator : HealthOperatorQueries.saveHealthOperator(patientToSave.healthOperator, false),
      phone: PhoneQueries.savePhone(patientToSave.phone, !_.isEmpty(PhoneQueries.findById(patientToSave.phone.id))),
      address: AddressQueries.saveAddress(patientToSave.address, !_.isEmpty(patientToSave.address.id)),
      clinicalCondition: patientToSave.clinicalCondition,
      isProfessionalPatient: isProfessionalPatient
    };

    try {
      let savedPatient;

      realm.write(() => {
        savedPatient = realm.create('Patient', patient, isUpdate);
      });

      return savedPatient;
    } catch (e) {
      return { isError: true, title: "Error in Saving Patient", preview: "Had error when trying to save Patient" }
    }
  }


}

export default new PatientQueries();
