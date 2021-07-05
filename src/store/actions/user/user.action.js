import { get_user_details_by_access_token } from "../../../services/user.service";

export const get_user_details_by_access_token_action = () => {
    return (dispatch) => {
        dispatch({ type: 'CLEAR_USER_STATE' });

        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            localStorage.clear();
        } else {
            get_user_details_by_access_token(accessToken)
                .then(res => {
                    dispatch({ type: 'USER_DETAILS_FETCH_SUCCESSFUL', res })
                })
                .catch(err => {
                    dispatch({ type: 'USER_DETAILS_FETCH_ERROR', err });
                })
        }
    }
}

export const clear_user_state = () => {
    return (dispatch) => {
        dispatch({ type: 'CLEAR_USER_STATE' });
    }
}
