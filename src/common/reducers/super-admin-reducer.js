
import { authActions, superAdminActions } from "../actions/action-types";

const getInitialState = () => ({
    societyList: {},
    otpCred: {},
});

export const authSuperReducer = (state = getInitialState(), action) => {
    switch (action.type) {

        case superAdminActions.SUPER_ADMIN_SEND_OTP:
            return {
                ...state,
                otpCred: action.payload
            }
        case superAdminActions.GET_ALL_SOCIETY:
            return {
                ...state,
                societyList: action.payload
            }
        case authActions.RESET_STATE:
            return {
                ...state,
                societyList: {},
                otpCred: {},
            }
        default:
            return state;
    }
}
