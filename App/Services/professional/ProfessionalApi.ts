import AppConfig from '../../Config/AppConfig'
import apisauce from 'apisauce'

const create = (baseURL = AppConfig.apiUrl) => {

  const professionalApi = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 20000
  });

  const setAuthToken = (userAuth: any) => professionalApi.setHeader('Authorization', 'Bearer ' + userAuth);
  const removeAuthToken = () => professionalApi.setHeader('Authorization', '');
  const registerProfessional = (professional: any) => professionalApi.post('api/register/professional', professional);
  const getProfessionalInfo = () => professionalApi.get('api/professionals/me');
  const updateProfessional = (professional: any) => professionalApi.put("api/professionals", professional);
  const getProfessionalPatient = (professionalId: any) => professionalApi.get("api/professionals/" + professionalId + "/patients");
  const getProfessionalDuties = (professionalId: any) => professionalApi.get("api/professionals/" + professionalId + "/duties");

  return {
    registerProfessional,
    setAuthToken,
    removeAuthToken,
    getProfessionalInfo,
    updateProfessional,
    getProfessionalPatient,
    getProfessionalDuties
  }
};

// let's return back our create method as the default.
export default {
  create
}
