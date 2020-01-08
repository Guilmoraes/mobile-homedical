import AppConfig from '../../Config/AppConfig'
import apisauce from 'apisauce'

const create = (baseURL = AppConfig.apiUrl) => {

  const passwordApi = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 20000
  });


  const setAuthToken = (userAuth: string) => passwordApi.setHeader('Authorization', 'Bearer ' + userAuth);
  const removeAuthToken = () => passwordApi.setHeader('Authorization', '');

  const forgotPassword = (email: string) => passwordApi.post('api/account/reset_password/init', email, {headers: {'Content-Type': 'text/plain', 'Accept': 'application/json, text/plain, */*'}});

  return {
    // a list of the API functions from step 2
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    forgotPassword
  }
};

// let's return back our create method as the default.
export default {
  create
}
