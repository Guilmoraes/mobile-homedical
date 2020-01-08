import {Phone} from "./Phone";

export class Patient {
  id?: string;
  name?: string;
  birthdate?: any;
  healthOperator: any;
  clinicalCondition?: string;
  phone?: Phone;
  address: any;
  isProfessionalPatient?: boolean;
}
