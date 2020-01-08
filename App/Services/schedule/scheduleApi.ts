import AppConfig from '../../Config/AppConfig'
import apisauce from 'apisauce'
import {Schedule} from '../../Models/Schedule';

const create = (baseURL = AppConfig.apiUrl) => {

    const scheduleApi = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            'Cache-Control': 'no-cache'
        },
        // 10 second timeout...
        timeout: 20000
    });

    const setAuthToken = (userAuth: any) => scheduleApi.setHeader('Authorization', 'Bearer ' + userAuth);
    const removeAuthToken = () => scheduleApi.setHeader('Authorization', '');
    const createSchedule = (schedule: any) => scheduleApi.post('api/schedules', schedule);
    const getProfessionalSchedules = (professionalId: string) => scheduleApi.get('api/schedules/' + professionalId + '/professional');
    const syncSchedules = (schedules: Schedule[]) => scheduleApi.post('api/schedules/list', {schedules});
    const syncScheduleFiles = (files: File[]) => scheduleApi.post('api/files/sync', files);

    return {
        createSchedule,
        removeAuthToken,
        setAuthToken,
        getProfessionalSchedules,
        syncScheduleFiles,
        syncSchedules
    }
};

// let's return back our create method as the default.
export default {
    create
}
