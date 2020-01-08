import realm from "../Db"
import uuid from 'react-native-uuid'

class HealthOperatorQueries {

  findById(id: string) {
    return realm.objects('HealthOperator').filtered('id = $0', id)[0];
  }

  saveHealthOperator(healthOperatorToSave: any, isUpdate: boolean) {
    let healthOperator = {
      id: healthOperatorToSave.id ? healthOperatorToSave.id : uuid.v1(),
      ansRegister: healthOperatorToSave.ansRegister,
      socialReason: healthOperatorToSave.socialReason,
      obs: healthOperatorToSave.obs,
      modality: healthOperatorToSave.modality
    };

    try {
      let savedHealthOperator;
      realm.write(() => {
        savedHealthOperator = realm.create('HealthOperator', healthOperator, isUpdate);
      });

      return savedHealthOperator;
    } catch (e) {
      return { isError: true, title: "Error in Saving HealthOperator", preview: "Had error when trying to save HealthOperator"}
    }
  }
}

export default new HealthOperatorQueries();
