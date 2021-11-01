import React, { useState } from 'react';
import { connect } from 'react-redux';

import { SubNavbarState } from '../../Redux';
import { SubNavbarDispatchToProps } from '../../Redux/Actions/SubNavbarActions';
import * as Unicons from '@iconscout/react-unicons';

import { Link, useHistory } from 'react-router-dom';
import TitleHeader from '../TitleHeader';

export type nav = {
    items: Array<any>;
    setItemAct: any;
    itemActive: number;
    isAdmin: boolean;
};

function SubNavbar({ items, itemActive, setItemAct }: nav) {
    const history = useHistory();
    const [isInDashboard] = useState(history.location.pathname === '/admin');

    return (
        <nav className='sub-navbar mb-3'>
            <div className='d-flex flex-column me-4'>
                <TitleHeader title={items[itemActive].title} leading={items[itemActive].leading} />
            </div>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`item ${itemActive === index ? 'active' : ''}`}
                    onClick={() => {
                        setItemAct(item, index);
                        if (!isInDashboard) {
                            history.push('/admin');
                        }
                    }}
                >
                    {item.icon}
                    <span>{item.name}</span>
                </div>
            ))}

            <div className='mt-3 ms-md-auto mt-md-auto '>
                <Link to={'/admin/create'} className='button-min'>
                    <Unicons.UilUserPlus />
                    <span>Crear usuario</span>
                </Link>
            </div>
        </nav>
    );
}

export default connect(SubNavbarState, SubNavbarDispatchToProps)(SubNavbar);
