import { call, put, all } from 'redux-saga/effects';
import ScheduleActions from '../../Redux/schedule/ScheduleRedux';
import _ from 'lodash';
import ScheduleQueries from '../../Data/queries/ScheduleQueries';
import { Schedule } from '../../Models/Schedule';
import { File } from '../../Models/File';
import moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob';
import { debug } from '../../Utils/log';
import { Signature } from '../../Models/Signature';

export function* getProfessionalSchedulesRemote(scheduleApi: any, professional: any) {
    const response = yield call(scheduleApi.getProfessionalSchedules, professional.id);
    if (response.ok) {
        yield* saveSchedules(response.data, professional);
    } else {
        throw { message: 'Error in sync Professional Schedules', error: 'Error in sync Professional Schedules' };
    }
}

export function* saveSchedules(schedules: Schedule[], professional: any) {
    const responses = yield all(
        schedules.map((schedule: any) => {
            return call(ScheduleQueries.saveScheduleFromSync, schedule, !_.isEmpty(ScheduleQueries.findById(schedule.id)), professional);
        })
    );
}

export function* syncSchedules(schedulesApi: any) {
    const unsyncSchedules = ScheduleQueries.findUnsynchronizedSchedules();
    const result: Schedule[] = [];

    unsyncSchedules.forEach(it => {
        const schedule = {
            id: it.id != null ? it.id : undefined,
            start: it.start != null ? moment(it.start).toDate() : undefined,
            finish: it.finish != null ? moment(it.finish).toDate() : undefined,
            status: it.status != null ? it.status : undefined,
            patient: it.patient != null ? it.patient : undefined,
            duty: it.duty != null ? it.duty : undefined,
            synchronized: it.synchronized != null ? it.synchronized : undefined,
            professional: it.professional != null ? it.professional : undefined
        };
        result.push(schedule);
    });

    const response = yield call(schedulesApi.syncSchedules, result);

    if (!response.ok) {
        throw { message: 'Error in sync Professional Schedule', error: 'Error in sync Professional Schedule' };
    }
}

export function* createSchedule({ schedule }: any) {
    const scheduleSaved = ScheduleQueries.saveSchedule(schedule, !_.isEmpty(ScheduleQueries.findById(schedule.id)));

    if (!_.isEmpty(scheduleSaved)) {
        yield put(ScheduleActions.refreshScheduleScreen(scheduleSaved));
        yield put(ScheduleActions.createScheduleRequestSuccess());
        return;
    }

    yield put(ScheduleActions.createScheduleRequestError());
}

export function* updateSchedule({ schedule }: any) {
    if (_.isEmpty(ScheduleQueries.findById(schedule.id))) {
        yield put(ScheduleActions.updateScheduleRequestError());
        return;
    }
    const scheduleSaved = ScheduleQueries.saveSchedule(schedule, !_.isEmpty(ScheduleQueries.findById(schedule.id)));

    if (!_.isEmpty(scheduleSaved)) {
        yield put(ScheduleActions.refreshScheduleScreen(scheduleSaved));
        yield put(ScheduleActions.updateScheduleRequestSuccess());
        return;
    }

    yield put(ScheduleActions.updateScheduleRequestError());
}

export function* scheduleSetAuthToken(scheduleApi: any, { token }: any) {
    yield call(scheduleApi.setAuthToken, token);
}

export function* saveSchedule(scheduleApi: any, schedule: Schedule) {
    schedule.scheduleImages = _.values(schedule.scheduleImages);
    schedule.signatures = _.values(schedule.signatures);
    if (schedule.scheduleImages != null && schedule.scheduleImages.length > 0) {
        const scheduleImages = yield call(getBase64List, _.values(schedule.scheduleImages).map(it => Object.assign({}, it)));
        const response = yield call(scheduleApi.syncScheduleFiles, scheduleImages);
        if (!response.ok) {
            throw { message: 'Error in sync Professional Schedule', error: 'Error in sync Professional Schedule' };
        }
    }
    if (schedule.signatures != null && schedule.signatures.length > 0) {
        const signatures: Signature[] = schedule.signatures.map(it => Object.assign({}, it));
        for (const signature of signatures) {
            signature.image = yield call(getBase64, Object.assign({}, signature.image));
        }
        schedule.signatures = signatures;
    }

    const response = yield call(scheduleApi.createSchedule, schedule);
    if (!response.ok) {
        throw { message: 'Error in sync Professional Schedule', error: 'Error in sync Professional Schedule' };
    }

    const scheduleSaved = ScheduleQueries.synchronizedUpdate(ScheduleQueries.findById(schedule.id), true);
    if (_.isEmpty(scheduleSaved)) {
        throw { message: 'Error in update Professional Schedule', error: 'Error in update Professional Schedule' };
    }
    yield put(ScheduleActions.refreshScheduleScreen(scheduleSaved));
}

export function* getProfessionalSchedules({ initialDate, finishDate }: any) {
    initialDate = initialDate.hours(0).minutes(0).seconds(0).milliseconds(0);
    finishDate = finishDate.hours(23).minutes(0).seconds(0).milliseconds(0);

    yield put(
        ScheduleActions.getProfessionalSchedulesRequestSuccess(ScheduleQueries.findByStartAndFinish(initialDate.toDate(), finishDate.toDate()))
    );
}

export const getBase64List = async (images: File[]) => {
    const newImages = await Promise.all(
        images.map(async image => {
            try {
                const uri = image.fileMobilePath!.toString().replace('file:///', '');
                const file = await RNFetchBlob.fs.readFile(uri, 'base64');
                image.file = file;
            } catch (e) {
                debug('Error on get image', e.message);
            }
            return image;
        })
    );
    return newImages;
};

export const getBase64 = async (image: File) => {
    try {
        const uri = image.fileMobilePath!.toString().replace('file:///', '');
        const file = await RNFetchBlob.fs.readFile(uri, 'base64').catch(it => debug('error', it));
        image.file = file;
    } catch (e) {
        debug('Error on get image', e.message);
    }
    return image;
};
