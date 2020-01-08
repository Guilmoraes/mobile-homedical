class Schedule {
  static schema = {
    name: "Schedule",
    primaryKey: "id",
    properties: {
      id: {type: 'string'},
      finish: {type: 'date', optional: true},
      synchronized: {type: 'bool', optional: true},
      start: {type: 'date'},
      status: {type: 'string', optional: true},
      duty: {type: 'Duty'},
      signatures: 'Signature[]',
      scheduleImages: 'File[]',
      patient: {type: 'Patient'},
      professional: {type: 'Professional'}
    }
  }
}

export default Schedule;

