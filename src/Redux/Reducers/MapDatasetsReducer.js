const initialState = {
    datasets: [],
    options: { centerMap: true, readOnly: false },
    config: {
        visState: {
            layers: [],
        },
    },
};

const MapDatasetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_DATASETS_TO_MAP':
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

export default MapDatasetsReducer;
