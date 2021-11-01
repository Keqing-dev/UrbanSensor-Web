import React from 'react';
import logo from '../../assets/img/mapoteca-logo.png';
import { NavLink, useHistory } from 'react-router-dom';
// @ts-ignore
import * as Unicons from '@iconscout/react-unicons';
import { logout } from '../../utils/logout';

function Sidebar() {
    const history = useHistory();

    return (
        <nav id='sidebar' className='sidebar hide-sidebar'>
            <header className='sidebar-header'>
                <div className='logo-container'>
                    <img src={logo} alt='' />
                </div>
            </header>
            <div className='sidebar-container'>
                <NavLink
                    activeClassName={'active'}
                    className='sidebar-container-item'
                    exact={true}
                    to={'/admin'}
                    menu-name='Dashboard'
                >
                    <Unicons.UilEstate />
                </NavLink>
                <NavLink
                    activeClassName={'active'}
                    className='sidebar-container-item'
                    exact={true}
                    to={'/map'}
                    menu-name='Mapa'
                >
                    <Unicons.UilMap />
                </NavLink>
            </div>
            <footer className='sidebar-footer'>
                <div
                    className='sidebar-container-item red'
                    onClick={() => {
                        logout();
                        history.replace('/');
                    }}
                    menu-name='Cerrar Sesión'
                >
                    <Unicons.UilSignOutAlt />
                </div>
            </footer>
        </nav>
    );
}

export default Sidebar;
