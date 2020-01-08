class Address {
  static schema = {
    name: "Address",
    primaryKey: "id",
    properties: {
      id: {type: 'string'},
      street: {type: 'string', optional: true},
      number: {type: 'string', optional: true},
      zipcode: {type: 'string', optional: true},
      city: {type: 'City'},
      lat: {type: 'double', optional: true},
      lng: {type: 'double', optional: true}
    }
  }
}

export default Address;
