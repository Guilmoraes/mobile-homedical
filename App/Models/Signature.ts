import { SignaturesType } from '../Enums/SignaturesType';
import { File } from './File';

export class Signature {
    id?: string;
    image?: File;
    type?: SignaturesType;
}
