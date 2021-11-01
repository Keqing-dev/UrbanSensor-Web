export const AlertDispatchToProps = (dispatch) => ({
    setAlertAct(payload) {
        dispatch({
            type: 'SET_ALERT',
            isActive: payload.isActive,
            message: payload.message,
        });
    },
});
