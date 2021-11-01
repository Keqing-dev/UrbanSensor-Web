import * as Unicons from '@iconscout/react-unicons';

const initialState = {
    items: [
        {name: 'Usuarios', icon: <Unicons.UilUsersAlt/>, title: 'Admin', leading: 'Panel de administración'},
        {name: 'Organizaciones', icon: <Unicons.UilBuilding/>, title: 'Admin', leading: 'Panel de administración'}
    ],
    itemActive: 0,

}


const SubNavbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEM':
            return {
                ...state,
                itemActive: action.itemActive,
            };
        default:
            return state;
    }

}

export default SubNavbarReducer;