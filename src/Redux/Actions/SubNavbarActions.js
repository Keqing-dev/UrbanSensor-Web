export const SubNavbarDispatchToProps = dispatch => ({

    setItemAct(item, index) {
        dispatch({
            type: 'SET_ITEM',
            itemActive: index
        });
    }

});