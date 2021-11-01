import { store } from '../Redux';

export const logout = () => {
    localStorage.clear();
    store.dispatch({
        type: 'LOGOUT',
    });
};
