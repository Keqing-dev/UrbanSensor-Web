const initialState = {
    isAuth: false,
    isGuest: true,
    id: null,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                ...action.user,
            };
        case'SET_GUEST':
            return {
                ...state,
                isGuest: action.isGuest
            }
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export default UserReducer;
