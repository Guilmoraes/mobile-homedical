import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./AppStateRedux').reducer,
  // ignite-jhipster-redux-store-import-needle
  account: require('./AccountRedux').reducer,
  login: require('./LoginRedux').reducer,
  register: require('./RegisterRedux').reducer,
  search: require('./SearchRedux').reducer,
  forgotPassword: require('./ForgotPasswordRedux').reducer,
  city: require('./city/CityRedux').reducer,
  specialty: require('./specialty/SpecialtyRedux').reducer,
  professional: require('./professional/ProfessionalRedux').reducer,
  sync: require('./sync/SyncRedux').reducer,
  syncSchedule: require('./sync/SyncScheduleRedux').reducer,
  patient: require('./patient/PatientRedux').reducer,
  duty: require('./duty/DutyRedux').reducer,
  schedule: require('./schedule/ScheduleRedux').reducer,
  local: require('./localredux/LocalRedux').reducer,
  document: require('./document/DocumentRedux').reducer
});

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
