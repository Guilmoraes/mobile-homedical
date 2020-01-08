import realm from "../Db"
import uuid from 'react-native-uuid'

class HealthOperatorQueries {

  findById(id: string) {
    return realm.objects('Phone').filtered('id = $0', id)[0];
  }

  savePhone(phoneToSave: any, isUpdate: boolean) {

    let phone = {
      id: phoneToSave.id ? phoneToSave.id : uuid.v1(),
      areaCode: phoneToSave.areaCode,
      number: phoneToSave.number,
      type: phoneToSave.type
    };

    try {
      let phoneSaved;
      realm.write(() => {
        phoneSaved = realm.create('Phone', phone, isUpdate);
      });
      return phoneSaved;
    } catch (e) {
      return { isError: true, title: "Error in Saving Phone", preview: "Had error when trying to save Phone"}
    }
  }
}

export default new HealthOperatorQueries();
