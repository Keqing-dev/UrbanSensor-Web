export const LocationTooltipDispatchToProps = (dispatch) => ({
    setLocationTooltipAct(location) {
        dispatch({
            type: 'SET_TOOLTIP_LOCATION',
            ...location,
        });
    },
    setPointSelectedAct(point) {
        dispatch({
            type: 'SET_SELECTED_POINT',
            payload: {
                ...point,
            },
        });
    },
});
