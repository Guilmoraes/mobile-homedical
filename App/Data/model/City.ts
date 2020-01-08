class City {
  static schema = {
    name: 'City',
    primaryKey: "id",
    properties: {
      id: {type: 'string'},
      name: {type: 'string'}
    }
  }
}

export default City;
