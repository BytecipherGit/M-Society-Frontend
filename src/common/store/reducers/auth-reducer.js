import { authActions } from "../actions/action-types";

const getInitialState = () => ({
  loginUser: {},
});

export const authReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case authActions.AUTH_LOGIN:
      return {
        ...state,
        loginUser: action.payload,
      };
    case authActions.RESET_STATE:
      return {
        ...state,
        loginUser: {},
      };

    default:
      return state;
  }
};
