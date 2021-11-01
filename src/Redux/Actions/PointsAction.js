export const PointsDispatchToProps = (dispatch) => ({
    setProjectAct(isSelected) {
        //parsear json
        dispatch({
            type: 'SET_PROJECT',
            isSelected
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
