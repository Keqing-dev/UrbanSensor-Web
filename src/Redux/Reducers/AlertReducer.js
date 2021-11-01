const initialState = {
    isActive: false,
    message: null,
};

const AlertReducer = (state = initialState, action) => {
    //ver actions de kepler
    // console.log(action);
    // console.log(state);

    switch (action.type) {
        case 'SET_ALERT':
            return {
                ...state,
                isActive: action.isActive || false,
                message: action.message || null,
            };

        default:
            return state;
    }
};

export default AlertReducer;
