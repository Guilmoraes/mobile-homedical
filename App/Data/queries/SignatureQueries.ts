import realm from '../Db';
import { File } from '../../Models/File';
import { debug } from '../../Utils/log';
import FileQueries from './FileQueries';
import { Signature } from '../../Models/Signature';

const uuid = require('react-native-uuid');
const _ = require('lodash');

class SignatureQueries {
    findById(id: string) {
        return realm.objects('Duty').filtered('id = $0', id)[0];
    }

    saveSignature(signatureToSave: Signature, isUpdate: boolean): File | undefined {
        if (signatureToSave.image != null) {
            signatureToSave.image.id = uuid.v1();
        }

        const signature: Signature = {
            id: signatureToSave.id ? signatureToSave.id : uuid.v1(),
            image: signatureToSave.image,
            type: signatureToSave.type
        };

        try {
            let savedSignature: Signature | undefined;

            realm.write(() => {
                savedSignature = realm.create('Signature', signature, isUpdate);
            });

            return savedSignature;
        } catch (e) {
            debug('Error on save File', e.message);
            return undefined;
        }
    }
}

export default new SignatureQueries();
