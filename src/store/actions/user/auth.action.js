import {Register, verify_otp} from "../../../services/auth.service";

/**
 * Register User Action
 * @param credentials
 * @returns {function(...[*]=)}
 * @constructor
 */
export const RegisterAction = (credentials) => {
    return (dispatch) => {
        dispatch({ type: 'RESTART_AUTH_RESPONSE' });
        dispatch({ type: 'LOADING' });

        Register(credentials)
            .then(res => {
                if (res.status === 200)
                    dispatch({ type: 'REGISTRATION_SUCCESS', res });
                else
                    dispatch({ type: 'REGISTRATION_FAILED', res });
            })
            .catch(err => dispatch({ type: 'CODE_ERROR', err }));
    }
}

export const verify_otp_action = (credentials) => {
    return (dispatch) => {
        dispatch({ type: 'RESTART_AUTH_RESPONSE' });

        verify_otp(credentials)
            .then(res => {
                if (res.status === 200)
                    dispatch({ type: 'OTP_VERIFICATION_SUCCESSFUL', res });
                else
                    dispatch({ type: 'OTP_VERIFICATION_FAILED', res });
            })
            .catch(err => { console.log('err', err); dispatch({ type: 'CODE_ERROR', err }) });
    }
}

/**
 * Clear Auth State
 * @returns {function(...[*]=)}
 * @constructor
 */
export const ClearAuthState = () => {
    return (dispatch) => {
        dispatch({ type:'RESTART_AUTH_RESPONSE' });
    }
}
