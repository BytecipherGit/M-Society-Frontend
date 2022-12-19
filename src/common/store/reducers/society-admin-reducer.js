import { authActions } from "../actions/action-types";

const getInitialState = () => ({
  residentList: {},
  noticeList: {},
});

export const authSocietyReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case authActions.RESET_STATE:
      return {
        ...state,
        residentList: {},
      };
    default:
      return state;
  }
};
