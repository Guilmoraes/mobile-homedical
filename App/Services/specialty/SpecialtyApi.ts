import AppConfig from '../../Config/AppConfig'
import apisauce from 'apisauce'

const create = (baseURL = AppConfig.apiUrl) => {

  const specialtyApi = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 20000
  });


  const findSpecialties = () => specialtyApi.get('api/specialties/enabled');

  return {
    findSpecialties
  }
};

// let's return back our create method as the default.
export default {
  create
}
