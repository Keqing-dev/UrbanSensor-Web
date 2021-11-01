export const PointsDispatchToProps = (dispatch) => ({
    setPointsAct(json) {
        //parsear json
        dispatch({
            type: 'SET_POINTS',
            payload: {
                ...json,
                points: json.points.flat(),
            },
        });
    },

    setMapDatasetAct(dataset) {
        dispatch({
            type: 'ADD_DATASETS_TO_MAP',
            payload: {
                ...dataset,
            },
        });
    },
});
