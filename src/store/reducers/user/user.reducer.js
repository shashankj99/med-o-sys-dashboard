const initialState = {
    userResponse: ''
};

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'CLEAR_USER_STATE':
            return {
                ...state,
                userResponse: ''
            };

        case 'USER_DETAILS_FETCH_SUCCESSFUL':
            return {
                ...state,
                userResponse: action.res.data.data
            };

        case 'USER_DETAILS_FETCH_ERROR':
            return {
                ...state,
                userResponse: action.res.data.data
            }

        case 'USER_DETAILS_UPDATE_SUCCESSFUL':
            return {
                ...state,
                userResponse: action.res.data
            };

        case 'USER_DETAILS_UPDATE_ERROR':
            return {
                ...state,
                userResponse: action.res.data
            }
    
        default:
            return state;
    }
}
