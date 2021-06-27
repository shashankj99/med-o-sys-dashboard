const initialState = {
    userAuthResponse: ""
};

const AuthReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'RESTART_AUTH_RESPONSE':
            return {
                ...state,
                userAuthResponse: ''
            };
        case 'LOADING':
            return {
                ...state,
                userAuthResponse: 'loading'
            };
        case 'REGISTRATION_SUCCESS':
            return {
                ...state,
                userAuthResponse: action.res.data
            };
        case 'REGISTRATION_FAILED':
            return {
                ...state,
                userAuthResponse: action.res.data
            };
        case 'OTP_VERIFICATION_SUCCESSFUL':
            return {
                ...state,
                userAuthResponse: action.res.data
            };
        case 'OTP_VERIFICATION_FAILED':
            return {
                ...state,
                userAuthResponse: action.res.data
            };
        case 'EMAIL_VERIFICATION_SUCCESSFUL':
            return {
                ...state,
                userAuthResponse: action.res.data
            };
        case 'EMAIL_VERIFICATION_FAILED':
            return {
                ...state,
                userAuthResponse: action.res.data
            };
        case 'CODE_ERROR':
            return {
                ...state,
                userAuthResponse: action.res.data
            };
        default:
            return state;
    }
}

export default AuthReducer;
