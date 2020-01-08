import Realm from 'realm';
import Secrets from 'react-native-config';

import City from '../Data/model/City';
import File from '../Data/model/File';
import Phone from '../Data/model/Phone';
import Address from '../Data/model/Address';
import Signature from '../Data/model/Signature';
import HealthOperator from '../Data/model/HealthOperator';
import Patient from '../Data/model/Patient';
import Duty from '../Data/model/Duty';
import Schedule from '../Data/model/Schedule';
import Professional from './model/Professional';

class Db {}

export default new Realm({
    schema: [ City, Phone, HealthOperator, Address, Patient, Duty, Professional, Schedule, File, Signature ],
    // schemaVersion: parseInt(Secrets.SCHEMA_VERSION)
    schemaVersion: parseInt(4)
});
