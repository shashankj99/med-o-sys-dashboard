const initialState = {
    districtResponse: ''
};

const DistrictReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'CLEAR_DISTRICT_RESPONSE':
            return {
                ...state,
                districtResponse: ''
            };
        case 'DISTRICT_LISTING_SUCCESS':
            return {
                ...state,
                districtResponse: action.res.data.data
            };
        case 'DISTRICT_LISTING_FAILED':
            return {
                ...state,
                districtResponse: action.res.data
            };
        case 'CODE_ERROR':
            return {
                ...state,
                districtResponse: action.res.data
            };
        default:
            return state;
    }
}

export default DistrictReducer;