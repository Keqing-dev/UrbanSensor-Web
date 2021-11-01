export const UserDispatchToProps = (dispatch) => ({
    setUserAct(user) {
        dispatch({
            type: 'SET_USER',
            ...user,
        });
    },
});
