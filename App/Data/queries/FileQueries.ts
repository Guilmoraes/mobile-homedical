import realm from '../Db'
import {Duty} from '../../Models/Duty'
import {File} from '../../Models/File';
import {debug} from '../../Utils/log';

const uuid = require('react-native-uuid')
const _ = require('lodash')


class FileQueries {

    findById(id: string) {
        return realm.objects('Duty').filtered('id = $0', id)[0];
    }

    saveFile(fileToSave: File, isUpdate: boolean): File | undefined {
        const file: File = {
            id: fileToSave.id ? fileToSave.id : uuid.v1(),
            fileName: fileToSave.fileName != null ? fileToSave.fileName : undefined,
            fileMobilePath: fileToSave.fileMobilePath != null ? fileToSave.fileMobilePath : undefined,
            fileContentType: fileToSave.fileContentType != null ? fileToSave.fileContentType : undefined
        };

        try {
            let savedFile: File | undefined;

            realm.write(() => {
                savedFile = realm.create('File', file, isUpdate);
            });

            return savedFile;
        } catch (e) {
            debug('Error on save File', e.message);
            return undefined;
        }
    }


}

export default new FileQueries();
