import realm from "../Db"
import uuid from 'react-native-uuid'
import CityQueries from '../../Data/queries/CityQueries'
import _ from 'lodash'

class AddressQueries {

  findById(id: string) {
    return realm.objects('Address').filtered('id = $0', id)[0];
  }

  saveAddress(addressToSave: any, isUpdate: boolean) {

    let address = {
      id: addressToSave.id ? addressToSave.id : uuid.v1(),
      street: addressToSave.street,
      number: addressToSave.number,
      zipcode: addressToSave.zip,
      city: CityQueries.saveCity(addressToSave.city, !_.isEmpty(CityQueries.findById(addressToSave.city.id))),
      lat: addressToSave.lat,
      lng: addressToSave.lng
    };

    try {
      let addressSaved;
      realm.write(() => {
        addressSaved = realm.create('Address', address, isUpdate);
      });
      return addressSaved;
    } catch (e) {
      return { isError: true, title: "Error in Saving Address", preview: "Had error when trying to save Address"}
    }
  }
}

export default new AddressQueries();
