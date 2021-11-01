const initialState = {
    x: null,
    y: null,
    latitude: null,
    longitude: null,
    isActive: false,
};

const LocationTooltipReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOOLTIP_LOCATION':
            return {
                ...state,
                ...action,
            };
        default:
            return state;
    }
};

export default LocationTooltipReducer;
