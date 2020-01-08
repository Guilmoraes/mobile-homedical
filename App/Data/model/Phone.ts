class Phone {
  static schema = {
    name: "Phone",
    primaryKey: "id",
    properties: {
      id: {type: 'string'},
      areaCode: {type: 'string', optional: true},
      number: {type: 'string', optional: true},
      type: {type: 'string', optional: true}
    }
  }
}

export default Phone;
