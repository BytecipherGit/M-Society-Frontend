import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { reducer as toastrReducer } from "react-redux-toastr";
import {
  authReducer,
  authSuperReducer,
  authSocietyReducer,
} from "./common/store/reducers";

const persistConfig = {
  key: "root",
  storage,
};
const authConfig = {
  key: "auth",
  storage,
};
const superAuthConfig = {
  key: "superAdmin",
  storage,
};
const societyAdminConfig = {
  key: "societyAdmin",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  superAdmin: persistReducer(superAuthConfig, authSuperReducer),
  societyAdmin: persistReducer(societyAdminConfig, authSocietyReducer),
  toastr: toastrReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
