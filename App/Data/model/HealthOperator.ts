class HealthOperator {
  static schema = {
    name: "HealthOperator",
    primaryKey: "id",
    properties: {
      id: {type: 'string'},
      ansRegister: {type: 'int'},
      socialReason: {type: 'string'},
      obs: {type: 'bool'},
      modality: {type: 'string'}
    }
  }
}

export default HealthOperator;

