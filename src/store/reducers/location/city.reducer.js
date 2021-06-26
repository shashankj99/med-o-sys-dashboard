const initialState = {
    cityResponse: ''
};

const CityReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'CLEAR_CITY_RESPONSE':
            return {
                ...state,
                cityResponse: ''
            };
        case 'CITY_LISTING_SUCCESS':
            return {
                ...state,
                cityResponse: action.res.data.data
            };
        case 'CITY_LISTING_FAILED':
            return {
                ...state,
                cityResponse: action.res.data
            };
        case 'CODE_ERROR':
            return {
                ...state,
                cityResponse: action.res.data
            };
        default:
            return state;
    }
}

export default CityReducer;