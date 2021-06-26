import {Register} from "../../../services/auth.service";

export const RegisterAction = (credentials) => {
    return (dispatch) => {
        dispatch({ type: 'RESTART_AUTH_RESPONSE' });
        dispatch({ type: 'LOADING' });

        Register(credentials)
            .then(res => {
                if (res.status === 200)
                    dispatch({ type: 'REGISTRATION_SUCCESS', res });
                else
                    dispatch({ type: 'REGISTRATION_FAILED', res })
            })
            .catch(err => dispatch({ type: 'CODE_ERROR', err }));
    }
}


export const ClearAuthState = () => {
    return (dispatch) => {
        dispatch({ type:'RESTART_AUTH_RESPONSE' });
    }
}
