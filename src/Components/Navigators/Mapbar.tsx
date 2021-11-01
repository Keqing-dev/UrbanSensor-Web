import React, {useState } from 'react';
import * as Unicons from '@iconscout/react-unicons';
import { useHistory } from 'react-router-dom';
import { logout } from '../../utils/logout';
import { connect, useDispatch } from 'react-redux';
import { PointsState, UserState } from '../../Redux';
import Charts from '../Charts';
import { Puff } from '@agney/react-loading';
import { PointsDispatchToProps } from '../../Redux/Actions/PointsAction';

function Mapbar({ setProjectAct }: any) {
    const history = useHistory();
    const [isExpanded, setExpanded] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const dispatch = useDispatch();


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
            <div id='screenshot-map' className='screenshot-container d-none'>
                <img src={imageUri} alt='' />
            </div>
            {isLoading ? (
                <div className='loading-content' data-html2canvas-ignore>
                    {/*//@ts-ignore*/}
                    <Puff width={50} />
                    <p>Generando captura</p>
                </div>
            ) : null}

            <div id='float-button-group-section' className='float-button-group '>

                <div className='button-square' id='butt' onClick={()=>setProjectAct(false)}>
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
            </div>

            <Charts />
        </div>
    );
}

export default connect(PointsState, PointsDispatchToProps)(Mapbar);
