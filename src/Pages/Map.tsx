import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Mapbar from '../Components/Navigators/Mapbar';
import { PointsState } from '../Redux';
import { PointsDispatchToProps } from '../Redux/Actions/PointsAction';
import * as Unicons from '@iconscout/react-unicons';
import { logout } from '../utils/logout';
import { useHistory, useLocation } from 'react-router-dom';
import ProjectsList from '../Components/ProjectsList';
import { CLOUD_PROVIDERS } from '../cloud-providers';
import { processKeplerglJSON } from 'kepler.gl/processors';
import { addDataToMap } from 'kepler.gl/actions';
import { Puff } from '@agney/react-loading';
import KeplerGl from '../Components/KeplerGl';

const { REACT_APP_MAPBOX_TOKEN } = process.env;

function Map({ isSelected, setProjectAct, isGuest }: any) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [loading,setLoading] = useState(true);
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        // @ts-ignore
        document.getElementById('root').style.overflowY = 'hidden';
        return () => {
            // @ts-ignore
            document.getElementById('root').style.overflowY = 'initial';
        };
    }, []);

    useEffect(() => {
        if (query.get('sharedMap') !== null) {
            axios.get(query.get('sharedMap') as string).then(res => {
                return res.data;
            }).then((data: any) => {
                dispatch(
                    addDataToMap(processKeplerglJSON(data)),
                );
                setProjectAct(true);
                dispatch({
                    type: 'SET_GUEST',
                    isGuest: true,
                });
                setLoading(false);
            }).catch(() => {
                setError(true);
                setLoading(false);
            });
        } else {
            dispatch({
                type: 'SET_GUEST',
                isGuest: false,
            });
        }
        // eslint-disable-next-line
    }, [query]);
    const localeMessages = {
        en: {
            // eslint-disable-next-line
            ['toolbar.shareMapURL']: 'Compartir mapa',
        },
    };
    return (
        <>
            { loading && isGuest? (
                <div className='loading-content' data-html2canvas-ignore>
                    {/*//@ts-ignore*/}
                    <Puff width={50} />
                    <p>Cargando datos</p>
                </div>
            ) : null}


            {!isSelected && !isGuest ? (
                <ProjectsList />
            ) : null}


            {error ? (
                <div className='loading-content'>
                    <h5>No presentas datos</h5>
                    <p>Recarga para volver a intentar</p>
                    <div
                        style={{ cursor: 'pointer' }}
                        className='d-flex justify-content-between text-danger'
                        onClick={() => {
                            history.replace('/');
                            logout();
                        }}
                    >
                        <p className='mx-2'>Cerrar sesión</p>
                        <Unicons.UilSignOutAlt />
                    </div>
                </div>
            ) : (
                <>
                    <Mapbar />
                    <KeplerGl
                        id='keplerMap'
                        appName='UrbanSensor'
                        appWebsite=''
                        version='0.5'
                        localeMessages={localeMessages}
                        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
                        cloudProviders={CLOUD_PROVIDERS}
                    />
                </>
            )}
        </>
    );
}

export default connect(PointsState, PointsDispatchToProps)(Map);
