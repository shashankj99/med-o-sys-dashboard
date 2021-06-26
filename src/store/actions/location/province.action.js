import {get_all_provinces} from "../../../services/location/province.service";

export const get_all_province_action = () => {
    return (dispatch) => {
        dispatch({ type: 'RESTART_PROVINCE_RESPONSE' });

        get_all_provinces()
            .then(res => {
                if (res.status === 200)
                    dispatch({ type: 'PROVINCE_LISTING_SUCCESS', res });
                else
                    dispatch({ type: 'PROVINCE_LISTING_FAILED', res })
            })
            .catch(err => dispatch({ type: 'CODE_ERROR', err }));
    }
}

export const clear_province_state = () => {
    return (dispatch) => {
        dispatch({ type: 'RESTART_PROVINCE_RESPONSE' })
    }
}
