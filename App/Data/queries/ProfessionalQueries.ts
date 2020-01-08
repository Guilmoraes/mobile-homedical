import realm from "../Db"

class ProfessionalQueries {

    findById(id: string) {
        return realm.objects('Professional').filtered('id = $0', id)[0];
    }

    saveProfessionalFromSyncSchedule(professionalToSave: any, isUpdate: boolean) {

        let professional = {
            id: professionalToSave.id,
            name: professionalToSave.name
        }

        return realm.create('Professional', professional, isUpdate)
    }

    saveProfessional(professionalToSave: any, isUpdate: boolean) {

        let professional = {
            id: professionalToSave.id,
            name: professionalToSave.name
        }

        let professionalSaved;

        realm.write(() => {
            professionalSaved = realm.create('Professional', professional, isUpdate)
        })

        return professionalSaved;

    }
}

export default new ProfessionalQueries();
