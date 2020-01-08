import realm from '../Db';
// @ts-ignore
import uuid from 'react-native-uuid';
import moment from 'moment';
import DutyQueries from './DutyQueries';
import PatientQueries from './PatientQueries';
import _ from 'lodash';
import { Schedule } from '../../Models/Schedule';
import ProfessionalQueries from './ProfessionalQueries';
import FileQueries from './FileQueries';
import { File } from '../../Models/File';
import { Signature } from '../../Models/Signature';
import SignatureQueries from './SignatureQueries';

class ScheduleQueries {
    findById(id: string) {
        return realm.objects('Schedule').filtered('id = $0', id)[0];
    }

    findAll() {
        return _.values(realm.objects('Schedule'));
    }

    findUnsynchronizedSchedules() {
        return _.values(realm.objects('Schedule').filtered('finish != $0 and synchronized = $1', null, false));
    }

    findByStartAndFinish(start: any, finish: any) {
        return _.values(realm.objects('Schedule').filtered('start >= $0 and start <= $1', start, finish));
    }

    lenghtOfSchedulesInMonth(start: Date, finish: Date): number {
        return _.values(realm.objects('Schedule').filtered('start >= $0 and start <=$1 and status != $2', start, finish, 'PENDING')).length;
    }

    saveScheduleFromSync(scheduleToSave: Schedule, isUpdate: boolean, professional: any) {
        realm.write(() => {
            const professionalPatients = PatientQueries.findByIsProfessionalPatient();
            const isProfessionalPatient = _.filter(professionalPatients, function(professionalPatient: any) {
                return professionalPatient.id === scheduleToSave.patient.id;
            });

            const patient = PatientQueries.savePatientFromSyncSchedule(
                scheduleToSave.patient,
                !_.isEmpty(isProfessionalPatient),
                !_.isEmpty(PatientQueries.findById(scheduleToSave.patient.id!!))
            );

            const professionalDuties = DutyQueries.findByIsProfessionalDuty();
            const isProfessionalDuty = _.filter(professionalDuties, function(professionalDuty: any) {
                return professionalDuty.id === scheduleToSave.duty.id;
            });

            const duty = DutyQueries.saveDutyFromSyncSchedule(
                scheduleToSave.duty,
                !_.isEmpty(isProfessionalDuty),
                !_.isEmpty(DutyQueries.findById(scheduleToSave.duty.id!!))
            );

            const schedule = {
                id: scheduleToSave.id,
                start: moment(scheduleToSave.start).utc(true).toDate(),
                finish: moment(scheduleToSave.finish).utc(true).toDate(),
                status: scheduleToSave.status,
                patient,
                duty,
                signatures: scheduleToSave.signatures,
                scheduleImages: scheduleToSave.scheduleImages,
                synchronized: true,
                professional: ProfessionalQueries.saveProfessionalFromSyncSchedule(
                    professional,
                    !_.isEmpty(ProfessionalQueries.findById(professional.id))
                )
            };

            try {
                const realmCreated = realm.create('Schedule', schedule, isUpdate);
                return realmCreated;
            } catch (e) {
                return {
                    isError: true,
                    title: 'Error in Saving Schedule',
                    preview: 'Had error when trying to save Schedule in sync'
                };
            }
        });
    }

    saveSchedule(scheduleToSave: Schedule, isUpdate: boolean) {
        const signatures: Signature[] = scheduleToSave.signatures != null ? _.values(scheduleToSave.signatures) : [];
        const scheduleImages: File[] = scheduleToSave.scheduleImages != null ? _.values(scheduleToSave.scheduleImages) : [];

        if (scheduleImages.length > 0) {
            scheduleImages.forEach(it => {
                if (it.id == null) {
                    const savedScheduleImage: File | undefined = FileQueries.saveFile(it, false);
                    if (savedScheduleImage != null) {
                        it.id = savedScheduleImage.id;
                    }
                }
            });
        }

        if (signatures.length > 0) {
            signatures.forEach(it => {
                if (it.image != null && it.id == null) {
                    const savedSignature: Signature | undefined = SignatureQueries.saveSignature(it, false);
                    if (savedSignature != null) {
                        it.id = savedSignature.id;
                        it.image = savedSignature.image;
                    }
                }
            });
        }

        const schedule = {
            id: scheduleToSave.id ? scheduleToSave.id : uuid.v1(),
            start: scheduleToSave.start ? moment(scheduleToSave.start).toDate() : new Date(),
            finish: scheduleToSave.finish ? moment(scheduleToSave.finish).toDate() : null,
            synchronized: scheduleToSave.synchronized ? scheduleToSave.synchronized : false,
            status: scheduleToSave.status,

            scheduleImages,
            signatures,
            duty: DutyQueries.findById(scheduleToSave.duty.id),
            patient: PatientQueries.findById(scheduleToSave.patient!.id!),
            professional: ProfessionalQueries.saveProfessional(
                scheduleToSave.professional,
                !_.isEmpty(ProfessionalQueries.findById(scheduleToSave!.professional!.id!))
            )
        };

        try {
            let scheduleSaved;
            realm.write(() => {
                scheduleSaved = realm.create('Schedule', schedule, isUpdate);
            });

            return scheduleSaved;
        } catch (e) {
            return {
                isError: true,
                title: 'Error in Saving Schedule',
                preview: 'Had error when trying to save Schedule'
            };
        }
    }

    synchronizedUpdate(scheduleToSave: any, isUpdate: boolean) {
        try {
            const schedule = {
                id: scheduleToSave.id,
                start: scheduleToSave.start ? moment(scheduleToSave.start).toDate() : new Date(),
                finish: scheduleToSave.finish ? moment(scheduleToSave.finish).toDate() : null,
                synchronized: true,
                status: scheduleToSave.status,
                signatures: scheduleToSave.signatures,
                scheduleImages: scheduleToSave.scheduleImages,
                duty: DutyQueries.findById(scheduleToSave.duty.id),
                patient: PatientQueries.findById(scheduleToSave.patient.id),
                professional: ProfessionalQueries.saveProfessional(
                    scheduleToSave.professional,
                    !_.isEmpty(ProfessionalQueries.findById(scheduleToSave.professional.id))
                )
            };
            let scheduleSaved;
            realm.write(() => {
                scheduleSaved = realm.create('Schedule', schedule, isUpdate);
            });

            return scheduleSaved;
        } catch (e) {
            return {
                isError: true,
                title: 'Error in Saving Schedule',
                preview: 'Had error when trying to save Schedule'
            };
        }
    }
}

export default new ScheduleQueries();
