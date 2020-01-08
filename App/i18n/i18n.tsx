import I18n from 'react-native-i18n'

I18n.fallbacks = true;

I18n.translations = {
  en: require('./locales/english.json'),
  pt: require('./locales/pt.json')
};

let languageCode = I18n.locale.substr(0, 2);

switch (languageCode) {
  case 'pt':
    I18n.translations.pt = require('./locales/pt.json');
    break;
  default:
    I18n.translations.en = require('./locales/pt.json');
    break;
}

export default I18n;
