// Simple React Native specific changes
import Secrets from 'react-native-config'

export default {
  apiUrl: Secrets.API_URL,
  termUrl: Secrets.TERM_URL,
  appUrlScheme: 'homedical',
  // font scaling override - RN default is on
  allowTextFontScaling: true
}
