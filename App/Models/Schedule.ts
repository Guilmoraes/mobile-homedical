import { Duty } from './Duty';
import { Patient } from './Patient';
import { File } from './File';
import { Signature } from './Signature';

export class Schedule {
    id: string;
    finish?: any;
    synchronized?: boolean;
    start: any;
    status?: string;
    duty: Duty;
    signatures: Signature[];
    scheduleImages: File[];
    patient: Patient;
}
