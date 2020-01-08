import realm from "../Db"
import uuid from 'react-native-uuid'

class CityQueries {

  findById(id: string) {
    return realm.objects('City').filtered('id = $0', id)[0];
  }

  saveCity(cityToSave: any, isUpdate: boolean) {

    let healthOperator = {
      id: cityToSave.id ? cityToSave.id : uuid.v1(),
      name: cityToSave.name
    };

    try {
      let savedCity;
      realm.write(() => {
        savedCity = realm.create('City', healthOperator, isUpdate);
      });

      return savedCity;
    } catch (e) {
      return { isError: true, title: "Error in Saving City", preview: "Had error when trying to save City"}
    }
  }
}

export default new CityQueries();
