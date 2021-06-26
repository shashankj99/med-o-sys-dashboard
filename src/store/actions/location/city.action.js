import {get_all_cities} from "../../../services/location/city.service";

export const get_all_cities_action = (districtId) => {
    return (dispatch) => {
        dispatch({ type: 'CLEAR_CITY_RESPONSE' });

        get_all_cities(districtId)
            .then(res => {
                if (res.status === 200)
                    dispatch({ type: 'CITY_LISTING_SUCCESS', res });
                else
                    dispatch({ type: 'CITY_LISTING_FAILED', res })
            })
            .catch(err => dispatch({ type: 'CODE_ERROR', err }));
    }
}

export const clear_city_response = () => {
    return (dispatch) => {
        dispatch({ type: 'CLEAR_CITY_RESPONSE' });
    }
}
