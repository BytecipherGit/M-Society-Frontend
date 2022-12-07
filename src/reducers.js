import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { reducer as toastrReducer } from "react-redux-toastr";
import { authReducer } from './common/reducers';


const persistConfig = {
  key: 'root',
  storage,
}
const authConfig = {
  key: 'auth',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  toastr: toastrReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
export default persistedReducer;
