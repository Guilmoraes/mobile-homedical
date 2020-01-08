import AppConfig from '../../Config/AppConfig'
import apisauce from 'apisauce'

const create = (baseURL = AppConfig.apiUrl) => {

  const documentApi = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 20 second timeout...
    timeout: 20000
  });

  const setAuthToken = (userAuth: any) => documentApi.setHeader('Authorization', 'Bearer ' + userAuth);
  const getProfessionalDocuments = () => documentApi.get('api/documents/professional');
  const getProfessionalPendingDocuments = () => documentApi.get('api/document-types/pending');
  const isWaitingApprovement = () => documentApi.get('api/documents/professional/is-waiting-approvement');

  const uploadDocs = (documents: Document[]) => documentApi.post('api/documents/list', {documents: documents});


  return {
    setAuthToken,
    getProfessionalDocuments,
    getProfessionalPendingDocuments,
    isWaitingApprovement,
    uploadDocs
  }
};

// let's return back our create method as the default.
export default {
  create
}
