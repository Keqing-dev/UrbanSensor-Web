const initialState = {
    isAuth: false,
    isAdmin: false,
    id: null,
    bucket: null,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                ...action.user,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export default UserReducer;
