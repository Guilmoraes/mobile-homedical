import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import { AsyncStorage } from 'react-native'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    blacklist: ['appState', 'search', 'sync', 'professional', 'schedule', 'document', 'forgotPassword', 'account'], // reducer keys that you do NOT want stored to persistence here
    // whitelist: [], Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
