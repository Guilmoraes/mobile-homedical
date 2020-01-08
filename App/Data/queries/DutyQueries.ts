import realm from "../Db"
import moment from 'moment'
import { Duty } from '../../Models/Duty'
import RealmDuty from '../../Data/model/Duty'
import { Results } from "realm";
const uuid = require('react-native-uuid')
const _ = require('lodash')

class DutyQueries {

  findById(id: string) {
    return realm.objects('Duty').filtered('id = $0', id)[0];
  }

  findAll() {
    return realm.objects('Duty');
  }

  findByIsProfessionalDuty(): Results<RealmDuty> {
    return realm.objects('Duty').filtered('isProfessionalDuty = $0', true);
  }

  updateFieldIsProfessionalDuty(duties: Duty[], isProfessionalDuty: boolean) {
    realm.write(() => {
      _.each(duties, function (duty: Duty) {
        let reamlDuty: any = realm.objects('Duty').filtered('id = $0', duty.id)[0];
        reamlDuty.isProfessionalDuty = isProfessionalDuty;
      })
    });
  }

  saveDutyFromSyncSchedule(dutyToSave: any, isProfessionalDuty: boolean, isUpdate: boolean) {
    let duty = {
      id: dutyToSave.id,
      isProfessionalDuty: isProfessionalDuty,
      name: dutyToSave.name
    }
    
    return realm.create('Duty', duty, isUpdate)
  }

  saveDuty(dutyToSave: any, isProfessionalDuty: boolean, isUpdate: boolean) {

    let duty = {
      id: dutyToSave.id ? dutyToSave.id : uuid.v1(),
      name: dutyToSave.name,
      start: moment(dutyToSave.start, "HH:mm:ss").toDate(),
      finish: moment(dutyToSave.finish, "HH:mm:ss").toDate(),
      overtime: moment(dutyToSave.overtime, "HH:mm:ss").toDate(),
      isProfessionalDuty: isProfessionalDuty
    };

    try {
      let dutySaved;

      realm.write(() => {
        dutySaved = realm.create('Duty', duty, isUpdate);
      });

      return dutySaved;
    } catch (e) {
      return { isError: true, title: "Error in Saving Duty", preview: "Had error when trying to save Duty" }
    }
  }


}

export default new DutyQueries();
