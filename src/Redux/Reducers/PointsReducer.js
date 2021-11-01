const initialState = {
    isSelected: false,
};

const PointsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PROJECT':
            return {
                ...state,
                isSelected: action.isSelected
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export default PointsReducer;
