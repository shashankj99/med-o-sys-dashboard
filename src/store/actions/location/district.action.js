import { get_all_districts } from "../../../services/location/district.service";

export const get_all_districts_action = (provinceId) => {
    return (dispatch) => {
        dispatch({ type: 'CLEAR_DISTRICT_RESPONSE' });

        get_all_districts(provinceId)
            .then(res => {
                if (res.status === 200)
                    dispatch({ type: 'DISTRICT_LISTING_SUCCESS', res });
                else
                    dispatch({ type: 'DISTRICT_LISTING_FAILED', res })
            })
            .catch(err => dispatch({ type: 'CODE_ERROR', err }));
    }
}

export const clear_district_response = () => {
    return (dispatch) => {
        dispatch({ type: 'CLEAR_DISTRICT_RESPONSE' });
    }
}
