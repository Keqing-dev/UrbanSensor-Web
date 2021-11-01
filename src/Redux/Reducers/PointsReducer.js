const initialState = {
    client: null,
    points: [],
    weeks: [],
    pointSelected: {
        lat: null,
        lon: null,
        nse: [{}],
        origin: [{}],
        tma: {},
        visitad: [{}],
    },
};

const PointsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POINTS':
            let client = action.payload.client;
            if (typeof client === 'object') {
                client = client.join();
            }
            return {
                ...state,
                ...action.payload,
                client,
            };

        case 'SET_SELECTED_POINT':
            let pointSelected = state.points.find((obj) => obj.id_ === action.payload.id);
            console.log(action.payload.id);
            return {
                ...state,
                pointSelected: pointSelected ?? initialState.pointSelected,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

export default PointsReducer;
