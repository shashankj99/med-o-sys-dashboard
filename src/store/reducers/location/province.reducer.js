const initialState = {
    provinceResponse: ''
};

const ProvinceReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'RESTART_AUTH_RESPONSE':
            return {
                ...state,
                provinceResponse: ''
            };
        case 'PROVINCE_LISTING_SUCCESS':
            return {
                ...state,
                provinceResponse: action.res.data
            };
        case 'PROVINCE_LISTING_FAILED':
            return {
                ...state,
                provinceResponse: action.res.data
            };
        case 'CODE_ERROR':
            return {
                ...state,
                provinceResponse: action.res.data
            };
        default:
            return state;
    }
}

export default ProvinceReducer;