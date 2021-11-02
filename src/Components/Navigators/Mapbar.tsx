import React, { useState } from 'react';
import * as Unicons from '@iconscout/react-unicons';
import { useHistory } from 'react-router-dom';
import { logout } from '../../utils/logout';
import { connect } from 'react-redux';
import { PointsState } from '../../Redux';
import Charts from '../Charts';
import { PointsDispatchToProps } from '../../Redux/Actions/PointsAction';

function Mapbar({ setProjectAct, isGuest }: any) {
    const history = useHistory();
    const [isExpanded, setExpanded] = useState(false);

    function handleFloatPane() {
        let floatButtonGroup = document.getElementById('float-button-group-section');
        let floatPane = document.getElementById('float-pane-section');

        if (floatButtonGroup?.classList.contains('float-button-group-active')) {
            floatButtonGroup.classList.remove('float-button-group-active');
            floatPane?.classList.add('float-pane-active');
            setExpanded(false);
        } else {
            floatButtonGroup?.classList.add('float-button-group-active');
            floatPane?.classList.remove('float-pane-active');
            setExpanded(true);
        }
    }


    return (
        <div>

            <div id='float-button-group-section' className='float-button-group '>
                {
                    isGuest ?
                        <div className='button-square' id='butt' onClick={() => history.replace('/')}>
                            <span menu-name='Inicio'>
                                <Unicons.UilHome/>
                            </span>
                        </div> :
                        <>
                            <div className='button-square' id='butt' onClick={() => setProjectAct(false)}>
                                <span menu-name='Proyectos'>
                                    <Unicons.UilFolder />
                                </span>
                            </div>
                            <div className='button-square' onClick={handleFloatPane}>
                                <span menu-name='Graficos'>
                                    {isExpanded ? <Unicons.UilArrowRight /> : <Unicons.UilChartLine />}
                                </span>
                            </div>
                            <div
                                className='button-square'
                                onClick={() => {
                                    logout();
                                    history.replace('/');
                                }}
                            >
                            <span menu-name='Cerrar Sesion'>
                                <Unicons.UilSignOutAlt />
                            </span>
                            </div>
                        </>
                }
            </div>

            <Charts />
        </div>
    );
}

export default connect(PointsState, PointsDispatchToProps)(Mapbar);
