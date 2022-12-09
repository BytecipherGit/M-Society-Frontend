import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { reducer as toastrReducer } from "react-redux-toastr";
import { authReducer } from './common/reducers';
import { authSuperReducer } from './common/reducers/super-admin-reducer';


const persistConfig = {
  key: 'root',
  storage,
}
const authConfig = {
  key: 'auth',
  storage,
};
const superAuthConfig = {
  key: 'superAdmin',
  storage,
};


const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  superAdmin: persistReducer(superAuthConfig, authSuperReducer),
  toastr: toastrReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
export default persistedReducer;
