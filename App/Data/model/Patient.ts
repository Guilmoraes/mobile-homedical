class Patient {
  static schema = {
    name: "Patient",
    primaryKey: "id",
    properties: {
      id: {type: 'string'},
      name: {type: 'string'},
      birthdate: {type: 'date', optional: true},
      healthOperator: {type: 'HealthOperator'},
      clinicalCondition: {type: 'string', optional: true},
      phone: {type: 'Phone', optional: true},
      address: {type: 'Address'},
      isProfessionalPatient: {type: 'bool'}
    }
  }
}

export default Patient;
