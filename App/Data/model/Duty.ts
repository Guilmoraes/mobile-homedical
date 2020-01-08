class Duty {
  static schema = {
    name: "Duty",
    primaryKey: "id",
    properties: {
      id: {type: 'string'},
      name: {type: 'string'},
      start: {type: 'date'},
      finish: {type: 'date'},
      overtime: {type: 'date'},
      isProfessionalDuty: {type: 'bool'}
    }
  }
}

export default Duty;

